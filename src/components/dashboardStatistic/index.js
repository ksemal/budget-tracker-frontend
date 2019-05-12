import React, { Component } from "react";
import { connect } from "react-redux";

import ProgressBar from "react-bootstrap/ProgressBar";

import { getSummary } from "../../actions";

import "./style.css";

class DashboardStatistic extends Component {
  state = {};

  componentDidMount() {
    this.props.getSummary();
  }
  render() {
    return this.props.summary.total ? (
      <div className="dashboard-statistic">
        <h5 className="card-title">Total expenses and income in this month</h5>
        <ProgressBar>
          {this.props.summary.expenditures ? (
            <ProgressBar
              className="progress expense-lable"
              animated
              striped
              label={this.props.summary.expenditures + "$"}
              max={this.props.summary.total}
              now={this.props.summary.expenditures}
              key={1}
            />
          ) : (
            ""
          )}

          {this.props.summary.income ? (
            <ProgressBar
              className="progress income-lable"
              animated
              striped
              label={this.props.summary.income + "$"}
              max={this.props.summary.total}
              now={this.props.summary.income}
              key={2}
            />
          ) : (
            ""
          )}

          <ProgressBar
            animated
            striped
            className="budget-lable progress"
            label={this.props.summary.total + "$"}
            max={this.props.summary.total}
            now={this.props.summary.total}
            key={3}
          />
        </ProgressBar>
        <span className="legend-wrap">
          <ProgressBar
            animated
            striped
            className="legend expense-lable"
            now={5}
            max="5"
          />
          <span className="text-lable"> - My total expenses</span>
        </span>
        <span className="legend-wrap">
          <ProgressBar
            animated
            striped
            className="legend income-lable"
            now={5}
            max="5"
          />
          <span className="text-lable"> - My total income</span>
        </span>
        <span className="legend-wrap">
          <ProgressBar
            animated
            striped
            className="budget-lable legend"
            now={5}
            max="5"
          />
          <span className="text-lable"> - My total</span>
        </span>
      </div>
    ) : (
      ""
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = {
  getSummary
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardStatistic);
