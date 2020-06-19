// import logo from "./logo.svg";
import "./App.css";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      networks: [],
      selectedNetwork: null,
      accounts: [],
      selectedAccount: null,
    };
  }

  fetchNetworks = async () => {
    var networks = await (await fetch("./inputs/networks.json")).json();
    console.log("networks: ", networks);

    this.setState(
      (prevState) => ({
        ...prevState,
        networks: networks,
      }),
      () => {
        if (this.state.networks.length > 0) {
          this.setState((prevState) => ({
            ...prevState,
            selectedNetwork: this.state.networks[0],
          }));
        }
      }
    );
  };

  fetchAccounts = async () => {
    var accounts = await (await fetch("./inputs/accounts.json")).json();
    console.log("accounts: ", accounts);

    this.setState(
      (prevState) => ({
        ...prevState,
        accounts: accounts,
      }),
      () => {
        if (this.state.accounts.length > 0) {
          this.setState((prevState) => ({
            ...prevState,
            selectedAccount: this.state.accounts[0],
          }));
        }
      }
    );
  };

  refreshNetwork = async (selectedNetwork) => {
    console.log("selectedNetwork: ", selectedNetwork);

    this.setState((prevState) => ({
      ...prevState,
      selectedNetwork: selectedNetwork,
    }));
  };

  refreshAccount = async (selectedAccount) => {
    console.log("selectedAccount: ", selectedAccount);

    this.setState((prevState) => ({
      ...prevState,
      selectedAccount: selectedAccount,
    }));
  };

  async componentDidMount() {
    console.log("component mounted");

    await this.fetchNetworks();
    await this.fetchAccounts();
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form
                className="gradient my-2 p-2"
                style={{
                  borderRadius: "25px",
                  boxShadow: "1px 1px 15px #000000",
                }}
              >
                <h1 style={{ fontWeight: 900, color: "#FFFFFF" }}>
                  Hash Wallet
                </h1>
                <Dropdown className="d-inline">
                  <Dropdown.Toggle
                    variant="dark"
                    style={{
                      fontWeight: "bold",
                      margin: "5px",
                      color: "#FFFFFF",
                    }}
                  >
                    {this.state.selectedNetwork
                      ? this.state.selectedNetwork.name
                      : "Network"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    variant="dark"
                    style={{ maxHeight: "200px", overflowY: "scroll" }}
                  >
                    {this.state.networks.map((network, index) => (
                      <Dropdown.Item
                        key={index}
                        style={{ textAlign: "center" }}
                        onClick={() => this.refreshNetwork(network)}
                      >
                        <div>
                          <p style={{ fontWeight: "bold" }}>{network.name}</p>
                          <p>{network.rpc_url}</p>
                        </div>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="d-inline">
                  <Dropdown.Toggle
                    variant="dark"
                    style={{
                      fontWeight: "bold",
                      margin: "5px",
                      color: "#FFFFFF",
                    }}
                  >
                    {this.state.selectedAccount
                      ? this.state.selectedAccount.name
                      : "Account"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    variant="dark"
                    style={{ maxHeight: "200px", overflowY: "scroll" }}
                  >
                    {this.state.accounts.map((account, index) => (
                      <Dropdown.Item
                        key={index}
                        style={{ textAlign: "center" }}
                        onClick={() => this.refreshAccount(account)}
                      >
                        <div>
                          <p style={{ fontWeight: "bold" }}>{account.name}</p>
                          <p>{account.address}</p>
                        </div>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
