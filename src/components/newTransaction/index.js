import React, { Component } from "react";
import { connect } from "react-redux";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";

import { getCategories, addNewCategory, removeCategory } from "../../actions";

import "./style.css";

class NewTransaction extends Component {
  state = {
    showCategoryInput: false
  };

  componentDidMount() {
    this.props.getCategories();
    console.log(this.props.wallet_id);
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
  handleNewCategoryInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  addNewCategory = e => {
    e.preventDefault();
    this.props.addNewCategory(this.state.newCategory);
    this.setState({
      newCategory: ""
    });
    console.log(this.state.newCategory);
  };
  render() {
    return (
      <div className="newTransaction">
        <h5>Add new transaction</h5>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder="Amount" />
          <InputGroup.Prepend>
            <InputGroup.Text>Title</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder="title" />
        </InputGroup>
        <div>
          <h5>Choose category</h5>
          {this.props.categories
            ? this.props.categories.map(category => (
                <Badge key={category.id} pill variant="info">
                  {category.name}{" "}
                  <i
                    className="far fa-times-circle"
                    onClick={() => this.props.removeCategory(category.id)}
                  />
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
                  onChange={this.handleNewCategoryInput}
                  autoFocus
                />
              </form>
            ) : (
              "+"
            )}
          </Badge>
        </div>
        <i className="fas fa-coins" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = { getCategories, addNewCategory, removeCategory };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTransaction);
