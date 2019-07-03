import React, { Component } from "react";
import { connect } from "react-redux";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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
    datetime: this.getDate(),
    imgPreview: "",
    image: "",
    notes: ""
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
  showAttachment = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(file);
      this.setState({
        imgPreview: reader.result,
        image: file
      });
    };
  };
  render() {
    return (
      <div className="newTransaction">
        <h5 className="card-title">Add new transaction</h5>
        <div className="mb-3">
          <label className="label-new-tr">Expense</label>
          <input
            type="range"
            id="switch"
            name="type"
            min="0"
            max="1"
            value={this.state.type}
            onChange={this.handleInput}
          />
          <label className="label-new-tr">Income</label>
        </div>
        <div className="mb-1">
          <h5 className="card-title">Choose date:</h5>
          <input
            className="input-date"
            type="date"
            name="datetime"
            min="2019-01-01"
            max="2025-01-01"
            value={this.state.datetime || "2019-01-01"}
            onChange={this.handleInput}
          />
        </div>
        <div>
          <h5 className="card-title">
            Select a file <span className="small"> (optional) </span>:{" "}
            <label htmlFor="select-file">
              <i className="fas fa-cloud-upload-alt" />
            </label>
          </h5>
          <input
            id="select-file"
            type="file"
            name="file"
            accept="image/png, image/jpeg"
            onChange={this.showAttachment}
          />

          {this.state.imgPreview ? (
            <img
              src={this.state.imgPreview}
              alt="preview"
              className="preview"
            />
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <h5 className="card-title">Choose category:</h5>
          {this.props.categories
            ? this.props.categories.map(category => (
                <Badge
                  key={category.id}
                  pill
                  onClick={() => this.chosenCategory(category.id)}
                  className={
                    this.state.chosenCategory === category.id
                      ? "clickedCategory"
                      : "category-badge"
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
          <Badge
            pill
            onClick={this.showNewCategoryInput}
            className="category-badge"
          >
            {this.state.showCategoryInput ? (
              <form onSubmit={this.addNewCategory}>
                <input
                  className="badgeInput"
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
        <InputGroup className="mb-3 mt-3">
          <InputGroup.Prepend>
            <InputGroup.Text>
              {this.state.amount && this.state.chosenCategory ? (
                <OverlayTrigger
                  className="newWallet"
                  placement="right"
                  overlay={
                    <Tooltip id="newTransaction">Add a transaction</Tooltip>
                  }
                >
                  <i
                    className="fas fa-coins"
                    onClick={() => {
                      this.props.addTransaction(
                        this.props.wallet_id,
                        this.state.amount,
                        this.state.chosenCategory,
                        this.state.notes,
                        this.state.datetime,
                        this.state.image
                      );
                      this.showModal();
                      this.setState({
                        notes: "",
                        amount: "",
                        chosenCategory: false,
                        imgPreview: "",
                        image: ""
                      });
                    }}
                  >
                    +
                  </i>
                </OverlayTrigger>
              ) : (
                "$"
              )}
            </InputGroup.Text>
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
