import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
const path = window.require("path");
const fs = window.require("fs");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }

  componentDidMount() {
    fs.readdir(path.resolve("."), (err, res) => {
      const fileList = res;
      this.setState({ fileList });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Electron</h1>
        </header>
        <ul className="App-intro">
          {this.state.fileList.map((x, index) => (
            <li key={index}>{JSON.stringify(x)}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
