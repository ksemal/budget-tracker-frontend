import React, { Component } from "react";
import Navbar from "../navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PieChart from "../piechart";

import "./style.css";

class Statistic extends Component {
  render() {
    return (
      <Row className="wrapper">
        <Col sm={{ span: 1 }}>
          <Navbar />
        </Col>
        <Col sm={{ span: 11 }}>
          <div>Statistic</div>
          <PieChart />
        </Col>
      </Row>
    );
  }
}

export default Statistic;
