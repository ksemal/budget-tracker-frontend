import React, { Component } from "react";
import { connect } from "react-redux";

import { getWallets, addWallet, removeWallet } from "../../actions";

import NewTransaction from "../newTransaction";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./style.css";

class WalletList extends Component {
  state = {
    wallet_id: null,
    toggleNewTransaction: false
  };
  addWallet(name, total) {
    this.props.addWallet(name, total);
  }
  openNewTransactionForm(id) {
    this.setState({
      toggleNewTransaction: true,
      wallet_id: id
    });
  }
  componentDidMount() {
    this.props.getWallets();
  }
  changeColor(id) {
    this.setState({ wallet_id: id });
  }
  handleNewWalletInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <>
        <div className="cardWrapper">
          {this.props.wallets
            ? this.props.wallets.map(wallet => (
                <Card
                  key={wallet.id}
                  bg="light"
                  className={
                    this.state.wallet_id === wallet.id
                      ? "wallet selected-wallet"
                      : "wallet"
                  }
                >
                  <Card.Body>
                    <Card.Title>{wallet.name}</Card.Title>
                    <Card.Text>Total: {wallet.total}$ </Card.Text>
                    <Card.Text className="smbutton-wr">
                      <OverlayTrigger
                        key="tooltip"
                        placement="right"
                        overlay={
                          <Tooltip id="newWallet">Add new transaction</Tooltip>
                        }
                      >
                        <div className="smbutton-wr-orange">
                          <i
                            className="fas fa-money-check-alt"
                            onClick={() => {
                              this.changeColor(wallet.id);
                              this.openNewTransactionForm(wallet.id);
                            }}
                          />
                        </div>
                      </OverlayTrigger>

                      <OverlayTrigger
                        key="tooltip"
                        placement="right"
                        overlay={<Tooltip>Remove the wallet</Tooltip>}
                      >
                        <div className="smbutton-wr-violet">
                          <i
                            className="remove-wallet fas fa-backspace"
                            onClick={() => {
                              this.props.removeWallet(wallet.id);
                              this.setState({
                                wallet_id: null,
                                toggleNewTransaction: false
                              });
                            }}
                          />
                        </div>
                      </OverlayTrigger>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            : "Add your first wallet"}
          <Card bg="light" className="wallet add-wallet">
            <Card.Body>
              <Card.Title>
                <small>Add a wallet</small>

                {this.state.wallet_name && this.state.wallet_total ? (
                  <OverlayTrigger
                    className="newWallet"
                    key="tooltip"
                    placement="right"
                    overlay={<Tooltip id="newWallet">Add a wallet</Tooltip>}
                  >
                    <i
                      className="fas fa-wallet"
                      onClick={() => {
                        this.addWallet(
                          this.state.wallet_name,
                          this.state.wallet_total
                        );
                        this.setState({
                          wallet_name: "",
                          wallet_total: ""
                        });
                      }}
                    />
                  </OverlayTrigger>
                ) : (
                  ""
                )}
              </Card.Title>
              <Form>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder="Wallet name"
                      name="wallet_name"
                      onChange={this.handleNewWalletInput}
                      value={this.state.wallet_name || ""}
                    />
                    <Form.Control
                      placeholder="Total"
                      name="wallet_total"
                      onChange={this.handleNewWalletInput}
                      value={this.state.wallet_total || ""}
                    />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </div>

        {this.state.toggleNewTransaction ? (
          <NewTransaction wallet_id={this.state.wallet_id} />
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = { getWallets, addWallet, removeWallet };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletList);
