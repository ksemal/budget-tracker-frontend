import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

import { getCategories, setBudget } from "../../actions";

import "./style.css";

class Budget extends Component {
  state = {};
  componentDidMount() {
    this.props.getCategories();
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
    console.log(this.props.categories);
    return (
      <Row>
        <Col sm={{ span: 10 }}>
          <ul className="budget-list">
            {this.props.categories
              ? this.props.categories.map(category => (
                  <li key={category.id}>
                    <Row>
                      <Col sm={{ span: 2 }}>
                        {category.name}
                        {category.budget ? " | Budget:" + category.budget : ""}
                      </Col>
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
                          <ProgressBar
                            animated
                            striped
                            className="bar-statistic"
                            label={category.budget + "$"}
                            max="1000"
                            now={category.budget}
                            key={1}
                          />
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  </li>
                ))
              : ""}
          </ul>
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
  setBudget
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Budget);
