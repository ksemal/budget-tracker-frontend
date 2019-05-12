import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../history";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import CarouselComponent from "../components/carousel";

import {
  handleSignInUpInput,
  handleSignUpSubmit,
  handleSignInSubmit
} from "../actions";

class LandingPage extends Component {
  componentDidMount() {
    this.props.userToken ? history.push("/dashboard") : history.push("/");
  }
  handleSignUpSubmit = e => {
    e.preventDefault();
    this.props.handleSignUpSubmit();
  };
  handleSignInSubmit = e => {
    e.preventDefault();
    this.props.handleSignInSubmit();
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.props.handleSignInUpInput(name, value);
  };
  render() {
    return (
      <div>
        <Row className="wrapper">
          <Col sm={{ span: 12 }} className="wr-inside">
            <h1 id="logo">ExpenseJar</h1>
            <CarouselComponent />
          </Col>
        </Row>
        <Row className="wrapper">
          <Col sm={{ span: 3, offset: 1 }}>
            <p className="landing-right-text">
              This app will help you manage your finances and see the statistic
            </p>
            <i className="fas fa-piggy-bank" />
          </Col>
          <Col className="landing-form" sm={{ span: 4, offset: 1 }}>
            <Tabs className="landing-tab" defaultActiveKey="SignIn">
              <Tab eventKey="SignUp" title="Sign Up">
                <Form onSubmit={this.handleSignUpSubmit}>
                  <Form.Group controlId="formSignUpEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      className="input"
                      type="email"
                      name="email_signup"
                      onChange={this.handleInputChange}
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group controlId="formSignUpPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password_signup"
                      onChange={this.handleInputChange}
                      placeholder="Create password"
                      autoComplete="on"
                    />
                  </Form.Group>
                  <Form.Group controlId="formSignUpPassword_confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password_signup_confirm"
                      onChange={this.handleInputChange}
                      placeholder="Confirm your password"
                      autoComplete="on"
                    />
                  </Form.Group>
                  <p className="sign-error">
                    {" "}
                    {this.props.signUpError ? this.props.signUpError : ""}
                  </p>

                  <Button type="submit" className="signin-signup">
                    Create new account
                  </Button>
                </Form>
              </Tab>
              <Tab eventKey="SignIn" title="Sign In">
                <Form onSubmit={this.handleSignInSubmit}>
                  <Form.Group controlId="formSignInEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={this.handleInputChange}
                      name="email_signin"
                      placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formSignInPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password_signin"
                      onChange={this.handleInputChange}
                      autoComplete="on"
                    />
                  </Form.Group>
                  <p className="sign-error">
                    {" "}
                    {this.props.signInError ? this.props.signInError : ""}
                  </p>
                  <Button className="signin-signup" type="submit">
                    Sign In
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = {
  handleSignInUpInput,
  handleSignUpSubmit,
  handleSignInSubmit
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
