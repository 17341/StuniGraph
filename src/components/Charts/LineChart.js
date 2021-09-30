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
    am4core.addLicense("ch-custom-attribution");
    let chart = am4core.create("lineChart", am4charts.XYChart);
    chart.paddingRight = 20;
    sendQuery(
      `MATCH (s:STUDENT)
      OPTIONAL MATCH (s)-[:REGISTER_IN]->(d:DATE)
      RETURN d.year, count(s) AS value ORDER BY d.year`,
      true
    ).then(function (res) {
      let previousValue;
      
      chart.data = res.map((key) => {
        try {
          let value = key["_fields"][1]["low"] + key["_fields"][1]["high"];
          let color = previousValue <= value ? "orange" : "purple";
          previousValue = value;
          return {
            date: key["_fields"][0],
            value: value,
            color: color,
          };
        } catch {return "error"}
      });

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "date";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
      valueAxis.renderer.axisFills.template.disabled = true;
      valueAxis.renderer.ticks.template.disabled = true;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.categoryX = "date";
      series.dataFields.valueY = "value";
      series.strokeWidth = 2;
      series.tooltipText = "Students: {valueY}";

      // set stroke property field
      series.propertyFields.stroke = "color";

      chart.cursor = new am4charts.XYCursor();

      // let scrollbarX = new am4core.Scrollbar();
      // chart.scrollbarX = scrollbarX;


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
