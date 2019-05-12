import React, { Component } from "react";
import { connect } from "react-redux";
import { removeTransaction, getTransactions } from "../../actions";

import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    title: ""
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
      <div className="transactions">
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
            as={ButtonGroup}
            title="By month"
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
        <div className="list-wrapper">
          {this.props.allTransactions.length ? (
            this.props.allTransactions.map(item => {
              return (
                <Row className="list" key={item.id}>
                  <Col sm={{ span: 9 }}>
                    <div className={item.type === "Income" ? "in" : "out"}>
                      {item.amount}${" "}
                      {item.type === "Income" ? "added to" : "withdrawn from"}{" "}
                      {item.wallet.name} wallet{" "}
                    </div>
                    <p>
                      Date: {item.datetime} | Category:{" "}
                      <Badge
                        pill
                        className={
                          item.type === "Income" ? "pill-violet" : "pill-orange"
                        }
                      >
                        {item.category.name}
                      </Badge>
                    </p>
                    {item.id === this.state.showNotes ? (
                      <p>Notes: {item.notes}</p>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col sm={{ span: 3 }} className="tr-wrapper">
                    {item.notes ? (
                      <div
                        className={
                          item.type === "Income"
                            ? "smallButtons violet-gr"
                            : "smallButtons orange-gr"
                        }
                        onClick={() => this.showNotes(item.id)}
                      >
                        <i className="far fa-question-circle" />
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      className={
                        item.type === "Income"
                          ? "smallButtons violet-gr"
                          : "smallButtons orange-gr"
                      }
                      onClick={() => this.props.removeTransaction(item.id)}
                    >
                      <i className="far fa-times-circle" />
                    </div>
                  </Col>
                </Row>
              );
            })
          ) : (
            <p className="muted">Add your first transaction</p>
          )}
        </div>
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
