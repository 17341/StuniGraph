/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useLayoutEffect } from "react";
import sendQuery from "../../hooks/sendQuery";

const PieChart = () => {
  useLayoutEffect(() => {
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution")
    let chart = am4core.create("pieChart", am4charts.PieChart);
    sendQuery(`MATCH (s:STUDENT) return s.grade`, true).then(function (res) {
      // Set data
      let selected;
      let dataDict = {};
      let dataDict2 = {};
      try {
        res.forEach((key) => {
          if (dataDict.hasOwnProperty(key["_fields"][0])) {
            dataDict[key["_fields"][0]] += 1;
          } else {
            dataDict[key["_fields"][0]] = 1;
          }
        });

        Object.keys(dataDict).forEach((key) => {
          if (dataDict2.hasOwnProperty(key.substring(0, 2))) {
            dataDict2[key.substring(0, 2)].percent += dataDict[key];
            dataDict2[key.substring(0, 2)].subs.push({
              type: key,
              percent: dataDict[key],
            });
          } else {
            dataDict2[key.substring(0, 2)] = {
              percent: dataDict[key],
              subs: [{ type: key, percent: dataDict[key] }],
            };
          }
        });
      } catch {}
      let types = Object.keys(dataDict2).map((key) => {
        return {
          type: key,
          percent: dataDict2[key].percent,
          subs: dataDict2[key].subs,
        };
      });

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
    });

    //let subtitle = chart.titles.create();
    // subtitle.text = "(click to open)";

    let title = chart.titles.create();
    title.text = "Students per grade";
    title.fontSize = 16;
    title.fontWeight = "600";
  }, []);
  return (
    <div
      id={`pieChart`}
      style={{ width: "100%", height: "100%" }} //height: "500px" }}
    ></div>
  );
};
export default PieChart;
