import React, { Component } from "react";
import { connect } from "react-redux";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";

import {
  getCategories,
  addNewCategory,
  removeCategory,
  addTransaction
} from "../../actions";

import "./style.css";

class NewTransaction extends Component {
  state = {
    showCategoryInput: false,
    chosenCategory: false,
    showModal: false,
    type: "0",
    datetime: this.getDate()
  };

  componentDidMount() {
    this.props.getCategories();
  }
  getDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return (today = yyyy + "-" + mm + "-" + dd);
  }

  showNewCategoryInput = () => {
    this.setState({
      showCategoryInput: true
    });
  };
  hideNewCategoryInput = () => {
    this.setState({
      showCategoryInput: false
    });
  };
  handleInput = event => {
    const name = event.target.name;
    let value = event.target.value;
    if (name === "type") {
      this.setState({
        amount: ""
      });
    }
    if (this.state.type === "0" && name === "amount" && parseFloat(value) > 0) {
      this.setState({
        [name]: value * -1
      });
    } else if (name === "amount" && !/^[-+]?[0-9]*\.?[0-9]+$/.test(value)) {
      return;
    } else {
      this.setState({
        [name]: value
      });
    }
  };
  addNewCategory = e => {
    e.preventDefault();
    this.props.addNewCategory(this.state.newCategory);
    this.setState({
      newCategory: ""
    });
  };
  chosenCategory = id => {
    this.setState({
      chosenCategory: id
    });
  };
  showModal = () => {
    this.state.showModal
      ? this.setState({
          showModal: false
        })
      : this.setState({
          showModal: true
        });
  };
  render() {
    return (
      <div className="newTransaction">
        <h5>Add new transaction</h5>
        <div>
          <label>Expense</label>
          <input
            type="range"
            id="switch"
            name="type"
            min="0"
            max="1"
            value={this.state.type}
            onChange={this.handleInput}
          />
          <label>Income</label>
        </div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="amount"
            placeholder="Amount"
            onChange={this.handleInput}
            value={this.state.amount || ""}
          />
          <FormControl
            name="notes"
            placeholder="Notes(optional)"
            onChange={this.handleInput}
            value={this.state.notes || ""}
          />
        </InputGroup>
        <div>
          <h5>Choose date</h5>
          <input
            type="date"
            name="datetime"
            min="2019-01-01"
            max="2025-01-01"
            value={this.state.datetime || "2019-01-01"}
            onChange={this.handleInput}
          />
        </div>
        <div>
          <h5>Choose category</h5>
          {this.props.categories
            ? this.props.categories.map(category => (
                <Badge
                  key={category.id}
                  pill
                  variant="info"
                  onClick={() => this.chosenCategory(category.id)}
                  className={
                    this.state.chosenCategory === category.id
                      ? "clickedCategory"
                      : ""
                  }
                >
                  {category.name}
                  {category.editable ? (
                    <i
                      className="far fa-times-circle"
                      onClick={() => this.props.removeCategory(category.id)}
                    />
                  ) : (
                    ""
                  )}
                </Badge>
              ))
            : ""}
          <Badge pill variant="info" onClick={this.showNewCategoryInput}>
            {this.state.showCategoryInput ? (
              <form onSubmit={this.addNewCategory}>
                <input
                  value={this.state.newCategory || ""}
                  name="newCategory"
                  onBlur={this.hideNewCategoryInput}
                  onChange={this.handleInput}
                  autoFocus
                />
              </form>
            ) : (
              "+"
            )}
          </Badge>
        </div>
        {this.state.amount && this.state.chosenCategory ? (
          <i
            className="fas fa-coins"
            onClick={() => {
              this.props.addTransaction(
                this.props.wallet_id,
                this.state.amount,
                this.state.chosenCategory,
                this.state.notes,
                this.state.datetime
              );
              this.showModal();
              this.setState({
                notes: "",
                amount: "",
                chosenCategory: false
              });
            }}
          />
        ) : (
          ""
        )}

        {
          <Modal
            size="sm"
            show={this.state.showModal}
            onHide={this.showModal}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              {this.props.transactionAdded}
            </Modal.Header>
          </Modal>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = {
  getCategories,
  addNewCategory,
  removeCategory,
  addTransaction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTransaction);
