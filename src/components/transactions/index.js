import React, { Component } from "react";
import { connect } from "react-redux";
import { removeTransaction, getTransactions } from "../../actions";

import Badge from "react-bootstrap/Badge";

import "./style.css";

class TransactionList extends Component {
  componentDidUpdate() {}
  componentDidMount() {
    this.props.getTransactions();
  }

  render() {
    return this.props.allTransactions
      ? this.props.allTransactions.map(item => {
          return (
            <div key={item.id}>
              <span>
                {item.amount}$ from {item.wallet.name} date: {item.datetime}{" "}
                Category:{" "}
                <Badge pill variant="info">
                  {item.category.name}
                </Badge>
              </span>
              <span
                className="remove-transaction"
                onClick={() => this.props.removeTransaction(item.id)}
              >
                <i className="far fa-times-circle" />
              </span>
            </div>
          );
        })
      : "";
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = { removeTransaction, getTransactions };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionList);
