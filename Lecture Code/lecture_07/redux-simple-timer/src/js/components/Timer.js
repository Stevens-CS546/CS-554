import React, { Component } from "react";
import { connect } from "react-redux";

class Timer extends Component {
  render() {
    return <h1>{this.props.secondsLeft} seconds left</h1>;
  }
}

const mapStateToProps = state => {
  return {
    secondsLeft: state.timer.secondsLeft
  };
};

Timer = connect(mapStateToProps)(Timer);

export default Timer;
