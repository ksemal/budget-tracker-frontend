import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "../navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TransactionList from "../transactions";
import WalletList from "../wallets";

import ProgressBar from "react-bootstrap/ProgressBar";

import "./style.css";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>Dashboard</h1>
        <Row>
          <Col sm={{ span: 10, offset: 1 }}>
            <ProgressBar
              animated
              striped
              variant="warning"
              label={this.props.expenses + " : my total expenses"}
              max="100"
              now={35}
              key={1}
            />
            <span className="budget-lable">
              My budget this month: {this.props.budget}
            </span>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 4, offset: 1 }}>
            <h5>My last 20 transactions</h5>
            <TransactionList allTransactions={this.props.transactionList} />
          </Col>
          <Col sm={{ span: 5, offset: 1 }}>
            <Row>
              <Col sm={{ span: 12 }}>
                <h5>My wallets</h5>
                <WalletList />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
