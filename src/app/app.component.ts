import { Component, OnInit, VERSION } from "@angular/core";
import * as Highcharts from "highcharts";

declare var require: any;
let Boost = require("highcharts/modules/boost");
let noData = require("highcharts/modules/no-data-to-display");
let More = require("highcharts/highcharts-more");

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  chart: Highcharts.Chart;

  ngOnInit() {
    this.chart = Highcharts.chart("container", this.options);
  }

  public options: Highcharts.Options = {
    chart: {
      height: 700,
      width: 1000,
      plotBackgroundColor: {
        linearGradient: { x1: 1, x2: 0, y1: 0, y2: 1 },
        stops: [[0.2, "#e3463b"], [0.5, "#ffda05"], [0.8, "#19cf1f"]]
      }
    },
    plotOptions: {
      series: {
        marker: {
          lineWidth: 2,
          fillOpacity: 1,
          lineColor: "#ffffff",
          states: {
            hover: {
              fillColor: "#ffffff"
            }
          }
        },
        dataLabels: {
          align: "center",
          color: "#ffffff",
          style: {
            textOutline: null,
            fontSize: 16 + "px"
          },
          enabled: true,
          formatter: function() {
            return Highcharts.numberFormat(this.y, 1);
          }
        }
      }
    },
    title: {
      text: "Risk Rating",
      align: "left"
    },
    credits: {
      enabled: false
    },
    tooltip: {
      backgroundColor: "#ffffff",
      pointFormatter: function() {
        return (
          "<strong>Overall</strong> </br></br> Exposure </br>" +
          this.name +
          "</br> </br> Security Level </br>" +
          this.x +
          " %"
        );
      }
    },
    yAxis: {
      visible: false,
      min: -0.5,
      max: 4.5,
      tickInterval: 0.5,
      opposite: true
    },
    xAxis: {
      tickWidth: 1,
      reversed: true,
      min: -5,
      max: 105,
      tickInterval: 10,
      labels: {
        formatter: function() {
          return this.value + "%";
        }
      }
    },
    series: [
      {
        type: "bubble",
        name: "",
        minSize: 60,
        maxSize: 60,
        color: "transparent",
        showInLegend: false,
        data: [
          {
            x: 10,
            y: 4.0,
            name: "very-low to low",
            events: {
              mouseOver: function(event) {
                const s = event.target as any;
                s.dataLabel.css({
                  color: "#30302E"
                });
              },
              mouseOut: function(event) {
                const s = event.target as any;
                s.dataLabel.css({
                  color: "#ffffff"
                });
              }
            }
          },
          {
            x: 25,
            y: 2.1,
            name: "very-low",
            events: {
              mouseOver: function(event) {
                const s = event.target as any;
                s.dataLabel.css({
                  color: "#30302E"
                });
              },
              mouseOut: function(event) {
                const s = event.target as any;
                s.dataLabel.css({
                  color: "#ffffff"
                });
              }
            }
          },
          {
            x: 0,
            y: 0,
            name: "low",
            events: {
              mouseOver: function(event) {
                const s = event.target as any;
                s.dataLabel.css({
                  color: "#30302E"
                });
              },
              mouseOut: function(event) {
                const s = event.target as any;
                s.dataLabel.css({
                  color: "#ffffff"
                });
              }
            }
          }
        ]
      }
    ]
  };

  update() {
    this.chart.series[0].setData([
      {
        x: 20,
        y: 2.0,
        name: "very-low to low"
      },
      {
        x: 55,
        y: 2.1,
        name: "very-low"
      },
      {
        x: 90,
        y: 1.0,
        name: "low"
      }
    ]);
  }
}
