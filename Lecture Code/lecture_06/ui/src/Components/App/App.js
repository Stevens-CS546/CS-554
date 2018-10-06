import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import { Books } from "../Books/Books";
import logo from "./logo.svg";
import "./App.css";

const App = () => (
  <Router>
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>An API Driven Book Manager</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="App-body">
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/books" component={Books} />
      </div>
    </div>
  </Router>
);

export default App;
