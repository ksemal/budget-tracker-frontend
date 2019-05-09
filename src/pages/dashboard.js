import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "../components/navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TransactionList from "../components/transactions";
import WalletList from "../components/wallets";
import DashboardStatistic from "../components/dashboardStatistic";

import "./style.css";

class Dashboard extends Component {
  render() {
    return (
      <Row className="wrapper">
        <Col className="wr-inside" sm={{ span: 1 }}>
          <Navbar />
        </Col>
        <Col sm={{ span: 11 }}>
          <Row>
            <Col sm={{ span: 10, offset: 1 }}>
              <h1>Dashboard</h1>
              <DashboardStatistic />
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 5, offset: 1 }}>
              <TransactionList />
            </Col>
            <Col sm={{ span: 4, offset: 1 }}>
              <Row>
                <Col sm={{ span: 12 }}>
                  <h5>My wallets</h5>
                  <WalletList />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
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
