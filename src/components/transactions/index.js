import React, { Component } from "react";
import { connect } from "react-redux";
import { removeTransaction, getTransactions } from "../../actions";

import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import "./style.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class TransactionList extends Component {
  state = {
    showNotes: "",
    title: "Here are your last 20 transactions"
  };
  componentDidUpdate() {}
  componentDidMount() {
    this.props.getTransactions({ last: 20 });
  }
  showNotes(id) {
    this.state.showNotes
      ? this.setState({
          showNotes: ""
        })
      : this.setState({
          showNotes: id
        });
  }

  render() {
    return (
      <div>
        <h5>{this.state.title}</h5>
        <ButtonGroup className="transaction-menu">
          <Button
            className="button_tr"
            onClick={() => {
              this.props.getTransactions();
              this.setState({ title: "All the transactions" });
            }}
          >
            All
          </Button>
          <Button
            className="button_tr"
            onClick={() => {
              this.props.getTransactions({ last: 20 });
              this.setState({ title: "Here are your last 20 transactions" });
            }}
          >
            Last 20
          </Button>
          <Button
            className="button_tr"
            onClick={() => {
              this.props.getTransactions({ daterange: "week" });
              this.setState({ title: "Transactions for this week" });
            }}
          >
            This Week
          </Button>
          <Button
            className="button_tr"
            onClick={() => {
              this.props.getTransactions({ daterange: "month" });
              this.setState({ title: "Transactions for this month" });
            }}
          >
            This Month
          </Button>
          <DropdownButton
            className="button_tr"
            as={ButtonGroup}
            title="Choose a month"
            id="bg-nested-dropdown"
          >
            {months.map((month, i) => (
              <Dropdown.Item
                key={i + 1}
                eventKey={i + 1}
                onClick={() => {
                  this.props.getTransactions({ daterange: i + 1 });
                  this.setState({ title: month + "'s transactions" });
                }}
              >
                {month}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </ButtonGroup>
        {this.props.allTransactions
          ? this.props.allTransactions.map(item => {
              return (
                <div key={item.id}>
                  <span>
                    <span className={item.type === "Income" ? "in" : "out"}>
                      {item.amount}$ {item.type === "Income" ? "to" : "from"}{" "}
                      {item.wallet.name} wallet{" "}
                    </span>
                    <span
                      className="smallButtons"
                      onClick={() => this.props.removeTransaction(item.id)}
                    >
                      <i className="far fa-times-circle" />
                    </span>
                    {item.notes ? (
                      <span
                        className="smallButtons"
                        onClick={() => this.showNotes(item.id)}
                      >
                        <i className="far fa-question-circle" />
                      </span>
                    ) : (
                      ""
                    )}

                    <p>
                      date: {item.datetime} | Category:{" "}
                      <Badge pill variant="info">
                        {item.category.name}
                      </Badge>
                    </p>
                  </span>
                  {item.id === this.state.showNotes ? <p>{item.notes}</p> : ""}
                </div>
              );
            })
          : "Add your first transaction"}
      </div>
    );
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
