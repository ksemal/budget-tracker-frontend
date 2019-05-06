import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import { connect } from "react-redux";

import Statistic from "./pages/statistic.js";
import Dashboard from "./pages/dashboard.js";

import LandingPage from "./pages/landing.js";

class App extends Component {
  render() {
    return this.props.userToken ? (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/statistic" component={Statistic} />
        </Switch>
      </Router>
    ) : (
      <Router history={history}>
        <Route exact path="/" component={LandingPage} />
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(App);
