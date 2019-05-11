import React, { Component } from "react";
import { connect } from "react-redux";
import { getStatistic } from "../../actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";
import CanvasJSReact from "../../canvasjs/canvasjs.react";
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const purple = [
  "#4B0082",
  "#800080",
  "#9932CC",
  "#9370DB",
  "#BA55D3",
  "#DA70D6",
  "#EE82EE",
  "#DDA0DD",
  "#D8BFD8",
  "#A74CAB",
  "#4B0082",
  "#800080",
  "#9932CC",
  "#9370DB",
  "#BA55D3",
  "#DA70D6",
  "#EE82EE",
  "#DDA0DD",
  "#D8BFD8",
  "#A74CAB"
];
const orange = [
  "#FF9955",
  "#E9C2A6",
  "#FBA16C",
  "#DB9370",
  "#FF7D40",
  "#FFA07A",
  "#FF7F50",
  "#EE7621",
  "#FF7216",
  "#FA9A50",
  "#FF9955",
  "#E9C2A6",
  "#FBA16C",
  "#DB9370",
  "#FF7D40",
  "#FFA07A",
  "#FF7F50",
  "#EE7621",
  "#FF7216",
  "#FA9A50"
];
class PieChart extends Component {
  state = {};
  componentDidMount() {
    this.props.getStatistic();
  }
  populateArr(arr) {
    const purpleArr = [];
    for (let i = 0; i < arr.length; i++) {
      purpleArr.push(purple[Math.floor(Math.random() * Math.floor(10))]);
    }
    return purpleArr;
  }
  render() {
    CanvasJS.addColorSet("purpleShades", purple);
    CanvasJS.addColorSet("orangeShades", orange);

    const optionsExpense = {
      animationEnabled: true,
      title: {
        text: "Expenses by category"
      },
      subtitles: [
        {
          text: "This month",
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
          yValueFormatString: "#,###'$'",
          dataPoints: this.props.statistic.expenditures
        }
      ],
      colorSet: "orangeShades"
    };
    const optionsIncome = {
      animationEnabled: true,
      title: {
        text: "Income by category"
      },
      subtitles: [
        {
          text: "This month",
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
          yValueFormatString: "#,###'$'",
          dataPoints: this.props.statistic.income
        }
      ],
      colorSet: "purpleShades"
    };

    return (
      <Row className="piechart">
        <Col md={{ span: 4, offset: 1 }}>
          <CanvasJSChart options={optionsExpense} />
        </Col>
        <Col md={{ span: 4, offset: 1 }}>
          <CanvasJSChart options={optionsIncome} />
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = {
  getStatistic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PieChart);
