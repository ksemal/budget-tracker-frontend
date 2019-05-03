import React, { Component } from "react";
import { connect } from "react-redux";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";

import { getCategories } from "../../actions";

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
    this.state.showCategoryInput
      ? this.setState({
          showCategoryInput: false
        })
      : this.setState({
          showCategoryInput: true
        });
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
                  {category.name} <i className="far fa-times-circle" />
                </Badge>
              ))
            : ""}
          <Badge pill variant="info" onClick={this.showNewCategoryInput}>
            {this.state.showCategoryInput ? (
              <FormControl onBlur={this.showNewCategoryInput} autoFocus />
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
const mapDispatchToProps = { getCategories };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTransaction);
