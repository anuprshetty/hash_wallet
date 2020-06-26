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

    chrome.storage.sync.set({
      _selectedNetwork: null,
      _selectedAccount: null,
    });
  }

  fetchNetworks = async () => {
    var networks = await (await fetch("./inputs/networks.json")).json();

    chrome.storage.sync.get(["_selectedNetwork"]).then((storage) => {
      let selectedNetworkExists = networks.some(
        (network) => network.name === storage._selectedNetwork?.name
      );
      if (!selectedNetworkExists) {
        storage._selectedNetwork = networks.length > 0 ? networks[0] : null;
        chrome.storage.sync.set({
          _selectedNetwork: storage._selectedNetwork,
        });
      }
      this.setState((prevState) => ({
        ...prevState,
        networks: networks,
        selectedNetwork: storage._selectedNetwork,
      }));
    });

    // if (this.state.selectedNetwork) {
    //   chrome.runtime.sendMessage({
    //     selectedNetwork: this.state.selectedNetwork,
    //   });
    // }
  };

  fetchAccounts = async () => {
    var accounts = await (await fetch("./inputs/accounts.json")).json();

    chrome.storage.sync.get(["_selectedAccount"]).then((storage) => {
      let selectedAccountExists = accounts.some(
        (account) => account.name === storage._selectedAccount?.name
      );
      if (!selectedAccountExists) {
        storage._selectedAccount = accounts.length > 0 ? accounts[0] : null;
        chrome.storage.sync.set({
          _selectedAccount: storage._selectedAccount,
        });
      }
      this.setState((prevState) => ({
        ...prevState,
        accounts: accounts,
        selectedAccount: storage._selectedAccount,
      }));
    });
  };

  refreshNetwork = async (selectedNetwork) => {
    chrome.storage.sync
      .set({
        _selectedNetwork: selectedNetwork,
      })
      .then(() => {
        this.setState((prevState) => ({
          ...prevState,
          selectedNetwork: selectedNetwork,
        }));
      });

    // chrome.runtime.sendMessage({ selectedNetwork: selectedNetwork });
  };

  refreshAccount = async (selectedAccount) => {
    chrome.storage.sync
      .set({
        _selectedAccount: selectedAccount,
      })
      .then(() => {
        this.setState((prevState) => ({
          ...prevState,
          selectedAccount: selectedAccount,
        }));
      });
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
                    {this.state.selectedNetwork?.name || "Network"}
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
                    {this.state.selectedAccount?.name || "Account"}
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
