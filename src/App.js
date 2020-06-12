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

    this.setState((prevState) => ({
      ...prevState,
      networks: networks,
    }));
  };

  fetchAccounts = async () => {
    var accounts = await (await fetch("./inputs/accounts.json")).json();
    console.log("accounts: ", accounts);

    this.setState((prevState) => ({
      ...prevState,
      accounts: accounts,
    }));
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
                className="gradient my-5 p-2"
                style={{
                  borderRadius: "25px",
                  boxShadow: "1px 1px 15px #000000",
                }}
              >
                <h1 style={{ fontWeight: 900, color: "#FFFFFF" }}>
                  Hash Wallet
                </h1>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.state.selectedNetwork
                      ? this.state.selectedNetwork.name
                      : "Select blockchain network"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {this.state.networks.map((network, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => this.refreshNetwork(network)}
                      >
                        {network.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.state.selectedAccount
                      ? this.state.selectedAccount.name
                      : "Select account"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {this.state.accounts.map((account, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => this.refreshAccount(account)}
                      >
                        {account.name}
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
