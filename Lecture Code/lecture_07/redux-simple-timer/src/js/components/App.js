import React, { Component } from "react";
import "../../css/App.css";
import { Provider } from "react-redux";
import store from "../config/store";
import SetTimer from "./SetTimer";
import Timer from "./Timer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <Timer />
            <SetTimer />
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
