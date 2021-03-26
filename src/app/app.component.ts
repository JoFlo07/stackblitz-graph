import { Component, OnInit, VERSION } from "@angular/core";
import * as Highcharts from "highcharts";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsNoData from "highcharts/modules/no-data-to-display";

HighchartsBoost(Highcharts);
HighchartsNoData(Highcharts);

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
      height: 600,
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
          enabled: true,
          inside: true
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
      backgroundColor: "rgba(255,255,255,1)",
      pointFormatter: function() {
        return (
          "<strong>" +
          this.options.custom.riskTitle +
          "</strong> </br></br> Exposure </br>" +
          this.name +
          "</br> </br> Security Level </br>" +
          this.x +
          " %"
        );
      },
      distance: 30
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
        minSize: 55,
        maxSize: 55,
        color: "transparent",
        showInLegend: false,
        dataLabels: [
          {
            allowOverlap: true,
            format: "{point.options.custom.riskType}",
            style: {
              color: "#ffffff",
              textOutline: null,
              fontSize: 15 + "px"
            },
            align: "center",
            verticalAlign: "top",
            y: -25
          },
          {
            className: "center-label",
            align: "center",
            allowOverlap: true,
            style: {
              color: "#ffffff",
              textOutline: null,
              fontSize: 16 + "px"
            },

            formatter: function() {
              return Highcharts.numberFormat(this.y, 1);
            }
          }
        ],
        data: [
          {
            custom: {
              riskType: "BI",
              riskTitle: "Business Interruption"
            },
            x: 10,
            y: 4.0,
            name: "very-low to low",
            events: {
              mouseOver: function(event) {
                const s = event.target as any;
                s.dataLabels.forEach(label => {
                  if (label.options.className === "center-label") {
                    label.css({
                      color: "#30302E"
                    });
                  }
                });
              },
              mouseOut: function(event) {
                const s = event.target as any;
                s.dataLabels.forEach(label => {
                  label.css({
                    color: "#ffffff"
                  });
                });
              }
            }
          },
          {
            custom: {
              riskType: "DB",
              riskTitle: "Data Breach"
            },
            x: 25,
            y: 2.1,
            name: "very-low",
            events: {
              mouseOver: function(event) {
                const s = event.target as any;
                s.dataLabels.forEach(label => {
                  if (label.options.className === "center-label") {
                    label.css({
                      color: "#30302E"
                    });
                  }
                });
              },
              mouseOut: function(event) {
                const s = event.target as any;
                s.dataLabels.forEach(label => {
                  label.css({
                    color: "#ffffff"
                  });
                });
              }
            }
          },
          {
            custom: {
              riskType: "OV",
              riskTitle: "Overall"
            },
            x: 0,
            y: 0,
            name: "low",
            events: {
              mouseOver: function(event) {
                const s = event.target as any;
                s.dataLabels.forEach(label => {
                  if (label.options.className === "center-label") {
                    label.css({
                      color: "#30302E"
                    });
                  }
                });
              },
              mouseOut: function(event) {
                const s = event.target as any;
                s.dataLabels.forEach(label => {
                  label.css({
                    color: "#ffffff"
                  });
                });
              }
            }
          }
        ]
      }
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400
          },
          chartOptions: {
            series: [
              {
                type: "bubble",
                minSize: 35,
                maxSize: 35
              }
            ],
            plotOptions: {
              series: {
                dataLabels: {
                  style: {
                    fontSize: 13 + "px"
                  }
                }
              }
            }
          }
        }
      ]
    }
  };

  update() {
    this.chart.series[0].data.forEach(d => {
      d.update({
        x: 10
      });
    });
  }
}
