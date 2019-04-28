import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "../navbar";
import TransactionList from "../transactions";

class Transactions extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div>Transactions</div>
        <TransactionList />
      </>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Transactions);
