/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useLayoutEffect } from "react";
import sendQuery from "../../hooks/sendQuery";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

const PieChart = () => {
  useLayoutEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.PieChart);
    sendQuery(`MATCH (s:STUDENT) return s.grade`, true).then(function (res) {
      // Set data
      let selected;
      let test = {};
      let test2 = {};

      res.forEach((key) => {
        if (test.hasOwnProperty(key["_fields"][0])) {
          test[key["_fields"][0]] += 1;
        } else {
          test[key["_fields"][0]] = 1;
        }
      });

      Object.keys(test).forEach((key) => {
        if (test2.hasOwnProperty(key.substring(0, 2))) {
          test2[key.substring(0, 2)].percent += test[key];
          test2[key.substring(0, 2)].subs.push({
            type: key,
            percent: test[key],
          });
        } else {
          test2[key.substring(0, 2)] = {
            percent: test[key],
            subs: [{ type: key, percent: test[key] }],
          };
        }
      });

      let types = Object.keys(test2).map((key) => {
        return {
          type: key,
          percent: test2[key].percent,
          subs: test2[key].subs,
        };
      });
      console.log(types);

      // Add data
      chart.data = generateChartData();

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "percent";
      pieSeries.dataFields.category = "type";
      pieSeries.slices.template.propertyFields.fill = "color";
      pieSeries.slices.template.propertyFields.isActive = "pulled";
      pieSeries.slices.template.strokeWidth = 0;

      function generateChartData() {
        let chartData = [];
        for (var i = 0; i < types.length; i++) {
          if (i === selected) {
            for (var x = 0; x < types[i].subs.length; x++) {
              chartData.push({
                type: types[i].subs[x].type,
                percent: types[i].subs[x].percent,
                color: types[i].color,
                pulled: true,
              });
            }
          } else {
            chartData.push({
              type: types[i].type,
              percent: types[i].percent,
              color: types[i].color,
              id: i,
            });
          }
        }
        return chartData;
      }

      pieSeries.slices.template.events.on("hit", function (event) {
        if (event.target.dataItem.dataContext.id !== undefined) {
          selected = event.target.dataItem.dataContext.id;
        } else {
          selected = undefined;
        }
        chart.data = generateChartData();
      });
    }, []);
  });

  return (
    <div
      id={`chartdiv`}
      style={{ width: "100%", height: "100%" }} //height: "500px" }}
    ></div>
  );
};
export default PieChart;
