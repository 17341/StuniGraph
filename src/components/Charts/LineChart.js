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
      `MATCH (s:STUDENT)
      OPTIONAL MATCH (s)-[:REGISTER_IN]->(d:DATE)
      RETURN d.year, count(s) AS value`,
      true
    ).then(function (res) {
      let previousValue;

      chart.data = res.map((key) => {
        try {
          let color =
            previousValue <=
            key["_fields"][1]["low"] + key["_fields"][1]["high"]
              ? "orange"
              : "purple";
          previousValue = key["_fields"][1]["low"] + key["_fields"][1]["high"];
          return {
            date: key["_fields"][0],
            value: key["_fields"][1]["low"] + key["_fields"][1]["high"],
            color: color,
          };
        } catch {}
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
  });

  }, []);

  return (
    <div
      id={`lineChart`}
      style={{ width: "100%", height: "100%" }} //height: "500px" }}
    ></div>
  );
};
export default LineChart;
