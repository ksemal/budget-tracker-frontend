import React, { Component } from "react";
import { connect } from "react-redux";
import { getStatistic } from "../../actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
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
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
class PieChart extends Component {
  state = {
    chartTitle: "This month"
  };
  componentDidMount() {
    this.props.getStatistic({ last: 20 });
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
          text: this.state.chartTitle,
          verticalAlign: "center",
          fontSize: 18,
          dockInsidePlotArea: true
        }
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'$'",
          dataPoints: this.props.statisticExpenses
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
          text: this.state.chartTitle,
          verticalAlign: "center",
          fontSize: 18,
          dockInsidePlotArea: true
        }
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'$'",
          dataPoints: this.props.statisticIncome
        }
      ],
      colorSet: "purpleShades"
    };
    console.log(this.props.statisticIncome);
    console.log(this.props.statisticExpenses);
    return (
      <div className="piechart-wr">
        <Row>
          <Col sm={{ span: 2, offset: 1 }}>
            <h5 className="card-title">See statistics:</h5>
          </Col>
          <Col sm={{ span: 8, offset: 1 }}>
            <ButtonGroup className="transaction-menu">
              <Button
                className="button_tr"
                onClick={() => {
                  this.setState({ chartTitle: "All the time" });
                  this.props.getStatistic();
                }}
              >
                All
              </Button>
              <Button
                className="button_tr"
                onClick={() => {
                  this.props.getStatistic({ last: 20 });
                  this.setState({
                    chartTitle: "Last 20 transactions"
                  });
                }}
              >
                Last 20
              </Button>
              <Button
                className="button_tr"
                onClick={() => {
                  this.props.getStatistic({ daterange: "week" });
                  this.setState({ chartTitle: "This week" });
                }}
              >
                This Week
              </Button>
              <Button
                className="button_tr"
                onClick={() => {
                  this.props.getStatistic({ daterange: "month" });
                  this.setState({ chartTitle: "This month" });
                }}
              >
                This Month
              </Button>
              <DropdownButton
                as={ButtonGroup}
                title="By month"
                id="bg-nested-dropdown"
              >
                {months.map((month, i) => (
                  <Dropdown.Item
                    key={i + 1}
                    eventKey={i + 1}
                    onClick={() => {
                      this.props.getStatistic({ daterange: i + 1 });
                      this.setState({ chartTitle: month + "'s statistic" });
                    }}
                  >
                    {month}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="piechart">
          <Col md={{ span: 6 }}>
            {this.props.statisticExpenses ? (
              <CanvasJSChart options={optionsExpense} />
            ) : (
              ""
            )}
          </Col>
          <Col md={{ span: 6 }}>
            {this.props.statisticIncome ? (
              <CanvasJSChart options={optionsIncome} />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div>
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
