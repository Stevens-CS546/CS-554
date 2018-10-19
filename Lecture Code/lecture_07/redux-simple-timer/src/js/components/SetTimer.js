import React, { Component } from "react";
import { connect } from "react-redux";
import { setSecondsLeft } from "../actions/timer";

class SetTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsInTimer: props.secondsLeft,
      currentTimeout: undefined
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.secondsLeft !== this.props.secondsLeft) {
      if (this.props.secondsLeft === 0) {
        this.setState({ currentTimeout: undefined });
        return;
      }

      const newSeconds = this.props.secondsLeft - 1;

      const currentTimeout = setTimeout(() => {
        this.props.setSecondsLeft(newSeconds);
      }, 1000);

      this.setState({ currentTimeout });
    }
  }

  updateSeconds = seconds => {
    this.setState({ secondsInTimer: seconds });
  };

  startTimer = e => {
    e.preventDefault();
    const { secondsInTimer, currentTimeout } = this.state;

    if (currentTimeout) {
      clearTimeout(currentTimeout);
      this.setState({ currentTimeout: undefined });
    }

    this.props.setSecondsLeft(secondsInTimer);
  };

  render() {
    const { secondsInTimer } = this.state;

    return (
      <form onSubmit={this.startTimer}>
        <input
          value={secondsInTimer}
          onChange={e => {
            const newSeconds = parseInt(e.target.value || "0");
            this.updateSeconds(newSeconds);
          }}
        />
        <button type="submit">Restart timer</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    secondsLeft: state.timer.secondsLeft
  };
};

const mapDispatchToProps = { setSecondsLeft };

SetTimer = connect(mapStateToProps, mapDispatchToProps)(SetTimer);

export default SetTimer;
