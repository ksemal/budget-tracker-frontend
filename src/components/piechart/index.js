import React, { Component } from "react";
import CanvasJSReact from "../../canvasjs/canvasjs.react";
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
  render() {
    CanvasJS.addColorSet("greenShades", [
      "#2F4F4F",
      "#008080",
      "#2E8B57",
      "#3CB371",
      "#90EE90",
      "#3CB371"
    ]);
    const options = {
      animationEnabled: true,
      title: {
        text: "Customer Satisfaction"
      },
      subtitles: [
        {
          text: "71% Positive",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true
        }
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints: [
            { name: "Unsatisfied", y: 5 },
            { name: "Very Unsatisfied", y: 31 },
            { name: "Very Satisfied", y: 40 },
            { name: "Satisfied", y: 17 },
            { name: "Neutral", y: 7 },
            { name: "add", y: 7 }
          ]
        }
      ],
      colorSet: "greenShades"
    };
    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default PieChart;
