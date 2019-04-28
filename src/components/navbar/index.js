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
      <Nav className="menu-navbar" activeKey="/dashboard">
        <Nav.Item>
          <Link to={"/dashboard"} className="navBarLink">
            Dashboard
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={"/transactions"} className="navBarLink">
            Transactions
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={"/budget"} className="navBarLink">
            Budget
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={"/statistic"} className="navBarLink">
            Statistic
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
