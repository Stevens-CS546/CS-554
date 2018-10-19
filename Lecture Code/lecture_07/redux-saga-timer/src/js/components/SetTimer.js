import React, { Component } from "react";
import { connect } from "react-redux";
import { beginCountdown } from "../actions/timer";

class SetTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsInTimer: props.secondsLeft
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.secondsLeft !== this.props.secondsLeft) {
      this.setState({ currentTimeout: this.props.secondsLeft });
    }
  }

  updateSeconds = seconds => {
    this.setState({ secondsInTimer: seconds });
  };

  startTimer = e => {
    e.preventDefault();

    const { secondsInTimer } = this.state;

    this.props.beginCountdown(secondsInTimer);
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
        <button type="submit">Start timer</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    secondsLeft: state.timer.secondsLeft
  };
};

const mapDispatchToProps = { beginCountdown };

SetTimer = connect(mapStateToProps, mapDispatchToProps)(SetTimer);

export default SetTimer;
