// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";

export default class App extends Component {
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
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
