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
                  bg={this.state.wallet_id === wallet.id ? "info" : ""}
                >
                  <Card.Body>
                    <Card.Title>
                      {wallet.name}
                      <small className="text-muted">
                        <OverlayTrigger
                          key="tooltip"
                          placement="right"
                          overlay={<Tooltip>Remove the wallet</Tooltip>}
                        >
                          <i
                            className="far fa-times-circle"
                            onClick={() => {
                              this.props.removeWallet(wallet.id);
                              this.setState({
                                wallet_id: null,
                                toggleNewTransaction: false
                              });
                            }}
                          />
                        </OverlayTrigger>
                      </small>
                    </Card.Title>
                    <Card.Text>Total: {wallet.total}$ </Card.Text>
                    <Card.Text>
                      <small className="text-muted">
                        <OverlayTrigger
                          key="tooltip"
                          placement="right"
                          overlay={
                            <Tooltip id="newWallet">
                              Add new transaction
                            </Tooltip>
                          }
                        >
                          <i
                            className="far fa-money-bill-alt"
                            onClick={() => {
                              this.changeColor(wallet.id);
                              this.openNewTransactionForm(wallet.id);
                            }}
                          />
                        </OverlayTrigger>
                      </small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            : "Add your first wallet"}
          <Card>
            <Card.Body>
              <Card.Title>
                <small>Add a wallet</small>
                <OverlayTrigger
                  key="tooltip"
                  placement="right"
                  overlay={<Tooltip id="newWallet">Add a wallet</Tooltip>}
                >
                  <i
                    className="fas fa-wallet"
                    onClick={() =>
                      this.addWallet(
                        this.state.wallet_name,
                        this.state.wallet_total
                      )
                    }
                  />
                </OverlayTrigger>
              </Card.Title>
              <Form>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder="Wallet name"
                      name="wallet_name"
                      onChange={this.handleNewWalletInput}
                    />
                    <Form.Control
                      placeholder="Total"
                      name="wallet_total"
                      onChange={this.handleNewWalletInput}
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
