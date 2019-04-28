import React, { Component } from "react";
// import { selectTransaction } from "../../actions";

class TransactionList extends Component {
  componentDidUpdate() {}

  render() {
    return this.props.transactionList
      ? this.props.transactionList.map(item => {
          return (
            <div key={item.id}>
              {item.amount} from {item.wallet_id} date: {item.created_at}
              {/* <button onClick={() => this.props.selectTransaction(item)}>
                Select
              </button> */}
              {/* {this.props.selected && item.name === this.props.selected.name ? (
            <Details />
          ) : (
            ""
          )} */}
            </div>
          );
        })
      : "";
  }
}

export default TransactionList;
