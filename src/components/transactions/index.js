import React, { Component } from "react";
import { connect } from "react-redux";
import { removeTransaction, getTransactions } from "../../actions";

import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import "./style.css";

class TransactionList extends Component {
  state = {
    showNotes: ""
  };
  componentDidUpdate() {}
  componentDidMount() {
    this.props.getTransactions();
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
        <ButtonGroup>
          <Button>last 20</Button>
          <Button>last week</Button>
          <Button>last month</Button>
          <DropdownButton
            as={ButtonGroup}
            title="Dropdown"
            id="bg-nested-dropdown"
          >
            <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
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
