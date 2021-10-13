import * as am4core from "@amcharts/amcharts4/core";

import { useLayoutEffect } from "react";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import sendQuery from "../../hooks/sendQuery";

const TagCloud = () => {
  useLayoutEffect(() => {
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution")
    let chart = am4core.create("tagChart", am4plugins_wordCloud.WordCloud);
    // chart.fontFamily = "Courier New";
    let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
    series.randomness = 0.1;
    series.rotationThreshold = 0.5;
    sendQuery(
      `MATCH (s:STUDENT)
      OPTIONAL MATCH (s)-[:HAS]->(c:COURSE)
      RETURN c.name as course, count(c) AS value, c.code`,
      true
    ).then(function (res) {
      //console.log(res)
      series.data = res.map((key) => {
        return {
          name: key["_fields"][0],
          url : key["_fields"][2],
          count: key["_fields"][1]["low"] + key["_fields"][1]["high"],
        };
      });
    });

    series.dataFields.word = "name";
    series.dataFields.value = "count";

    series.heatRules.push({
      target: series.labels.template,
      property: "fill",
      min: am4core.color("purple"),
      max: am4core.color("orange"),
      dataField: "value",
    });

    series.labels.template.url =
      "https://plus.ecam.be/public/fiche/2021/{url}";
    series.labels.template.urlTarget = "_blank";
    series.labels.template.tooltipText = "{word}: {value}";

    let hoverState = series.labels.template.states.create("hover");
    hoverState.properties.fill = am4core.color("#CC00CC");

    //let subtitle = chart.titles.create();
    // subtitle.text = "(click to open)";

    let title = chart.titles.create();
    title.text = "Most taken courses";
    title.fontSize = 16;
    title.fontWeight = "600";
  }, []);

  return (
    <div
      id={`tagChart`}
      style={{ width: "100%", height: "100%" }} //height: "500px" }}
    ></div>
  );
};
export default TagCloud;
