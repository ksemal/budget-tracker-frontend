import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

import { getCategories, setBudget, getBudgetExpenses } from "../../actions";

import "./style.css";

class Budget extends Component {
  state = {};
  componentDidMount() {
    this.props.getCategories();
    this.props.getBudgetExpenses();
  }

  handleInput = event => {
    const name = event.target.name;
    let value = event.target.value;
    if (/[0-9]*\.?[0-9]+$/.test(value)) {
      this.setState({
        [name]: value
      });
    }
  };
  setBudget = (e, id) => {
    e.preventDefault();
    this.props.setBudget(this.state[id], id);
  };

  render() {
    return (
      <Row>
        <Col sm={{ span: 10 }}>
          <ul className="budget-list">
            {this.props.categories && this.props.budgetExpenses
              ? this.props.categories.map(category => (
                  <li key={category.id}>
                    <Row>
                      <Col sm={{ span: 2 }}>{category.name}</Col>
                      <Col sm={{ span: 3 }}>
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder="Set Budget"
                            aria-label="Category budget"
                            onChange={this.handleInput}
                            name={category.id}
                            value={this.state[category.id] || ""}
                          />
                          <InputGroup.Append>
                            <Button
                              variant="outline-secondary"
                              onClick={e => this.setBudget(e, category.id)}
                            >
                              Set
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                      <Col sm={{ span: 7 }}>
                        {category.budget ? (
                          <Row>
                            <Col sm={{ span: 10 }}>
                              <ProgressBar
                                animated
                                striped
                                className="bar-statistic budget-bar"
                                label={
                                  this.props.budgetExpenses[category.name]
                                    ? this.props.budgetExpenses[category.name] *
                                        -1 +
                                      "$"
                                    : "0"
                                }
                                max={category.budget}
                                now={
                                  this.props.budgetExpenses[category.name] ||
                                  "0"
                                }
                                key={1}
                              />
                            </Col>
                            <Col sm={{ span: 2 }}>
                              <div>
                                {category.budget
                                  ? "Budget:" + category.budget
                                  : ""}
                              </div>
                            </Col>
                          </Row>
                        ) : (
                          <p>Set your budget for this category</p>
                        )}
                      </Col>
                    </Row>
                  </li>
                ))
              : "Add your first transaction to set up a budget by category"}
          </ul>
          <div className="wr-budget-legend">
            <span className="legend-wrap">
              <ProgressBar
                animated
                striped
                className="legend expense-lable"
                now={5}
                max="5"
              />
              <span> - My total expenses</span>
            </span>
            <span className="legend-wrap">
              <ProgressBar
                animated
                striped
                className="legend income-lable"
                now={5}
                max="5"
              />
              <span> - My total income</span>
            </span>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = {
  getCategories,
  setBudget,
  getBudgetExpenses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Budget);
