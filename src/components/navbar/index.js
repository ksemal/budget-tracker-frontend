import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import history from "../../history";
import { connect } from "react-redux";

import "./style.css";

import { signOut } from "../../actions";

class Navbar extends Component {
  signOut = () => {
    this.props.signOut();
    localStorage.clear();
    history.push("/");
  };
  render() {
    return (
      <Nav className="flex-column" activeKey="/dashboard">
        <Nav.Item>
          <Link to={"/dashboard"} className="navBarLink">
            <i className="fas fa-gamepad" />
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={"/statistic"} className="navBarLink">
            <i className="fas fa-chart-line" />
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={"/"} className="navBarLink" onClick={this.signOut}>
            <i className="fas fa-sign-out-alt" />
          </Link>
        </Nav.Item>
      </Nav>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = {
  signOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
