/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import { useLayoutEffect } from "react";
import sendQuery from "../../hooks/sendQuery";

const BarChart = () => {
  useLayoutEffect(() => {
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution")
    // Create chart instance
    let chart = am4core.create("barChart", am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();
    sendQuery(
      `MATCH (n:STUDENT)
      WITH count(n) as count
      RETURN 'Students' as label, count
      UNION ALL
      MATCH (n:COURSE)
      WITH count(n) as count
      RETURN 'Courses' as label, count 
      UNION ALL
      MATCH (n:TEACHER)
      WITH count(n) as count
      RETURN 'Teachers' as label, count`,
      true
    ).then(function (res) {
      // Add data
      try {
        chart.data = res.map((key) => {
          return {
            year: key["_fields"][0],
            students: key["_fields"][1]["low"] + key["_fields"][1]["high"],
          };
        });
      }
      catch{}
    });
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 10;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 10;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "students";
    series.dataFields.categoryX = "year";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

    let title = chart.titles.create();
    title.text = "Total numbers of ";
    title.fontSize = 16;
    title.fontWeight = "600";
  }, []);
  return (
    <div
      id={`barChart`}
      style={{ width: "100%", height: "100%" }} //height: "500px" }}
    ></div>
  );
};
export default BarChart;
