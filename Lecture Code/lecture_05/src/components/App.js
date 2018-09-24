import React from "react";
import DatepickerContainer from "./DatepickerContainer";

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="#">
          Webpack with React
        </a>
      </nav>
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Welcome to Webpack and React!!</h1>
            <p>This is now our app component!</p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>A Simple Datepicker</h2>
              <DatepickerContainer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
