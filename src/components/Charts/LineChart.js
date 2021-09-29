/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useLayoutEffect } from "react";
import sendQuery from "../../hooks/sendQuery";

const LineChart = () => {
  useLayoutEffect(() => {
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("lineChart", am4charts.XYChart);
    chart.paddingRight = 20;
    sendQuery(
      `match (s:STUDENT)-[r:REGISTER_IN]->(d:DATE) return d.year `,
      true
    ).then(function (res) {
      let previousValue;

      let dataDict = {};
      res.forEach((key) => {
        try {
          if (dataDict.hasOwnProperty(key["_fields"][0])) {
            dataDict[key["_fields"][0]] += 1;
          } else {
            dataDict[key["_fields"][0]] = 1;
          }
        } catch {}
      });

      chart.data = Object.keys(dataDict).map((key) => {
        let color = previousValue <= dataDict[key] ? "orange" : "purple";
        previousValue = dataDict[key];
        return {
          date: key,
          value: dataDict[key],
          color: color,
        };
      });
    });

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.strokeWidth = 2;
    series.tooltipText = "Students: {valueY}";

    // set stroke property field
    series.propertyFields.stroke = "color";

    chart.cursor = new am4charts.XYCursor();

    // let scrollbarX = new am4core.Scrollbar();
    // chart.scrollbarX = scrollbarX;

    dateAxis.start = 0;
    dateAxis.keepSelection = true;
    let title = chart.titles.create();
    title.text = "Number of registration per year";
    title.fontSize = 16;
    title.fontWeight = "600";
    
  }, []);

  return (
    <div
      id={`lineChart`}
      style={{ width: "100%", height: "100%" }} //height: "500px" }}
    ></div>
  );
};
export default LineChart;
