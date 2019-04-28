import React, { Component } from "react";
import { connect } from "react-redux";

import { getTransactions } from "../../actions";

import Navbar from "../navbar";
import TransactionList from "../transactions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }
  render() {
    return (
      <div>
        <Navbar />
        <h1>Dashboard</h1>
        <h4>Your lastast 20 transactions</h4>
        <TransactionList transactionList={this.props.transactionList} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactionList: state.allTransactions
  };
};
const mapDispatchToProps = { getTransactions };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
