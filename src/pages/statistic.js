import React, { Component } from "react";
import Navbar from "../components/navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PieChart from "../components/piechart";
import Budget from "../components/budget";

import "./style.css";

class Statistic extends Component {
  render() {
    return (
      <Row className="wrapper">
        <Col className="wr-inside" sm={{ span: 1 }}>
          <Navbar />
        </Col>
        <Col sm={{ span: 11 }}>
          <div>Statistic</div>
          <Budget />
          <PieChart />
        </Col>
      </Row>
    );
  }
}

export default Statistic;
