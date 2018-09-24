import React from "react";
import Datepicker from "./Datepicker";

class DatepickerContainer extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();

    this.state = {
      date: now
    };
  }

  updateDate = newDate => {
    this.setState({ date: newDate });
  };

  updateFromContainer = () => {
    const date = new Date(2018, 0, 1);

    this.setState({ date });
  };

  render() {
    const { date } = this.state;
    const dateString = date.toDateString();

    return (
      <div>
        <Datepicker date={date} onDateUpdate={this.updateDate} />
        <p>
          <em>You have selected {dateString}.</em>
        </p>
        <p>
          <button
            className="btn btn-primary"
            onClick={this.updateFromContainer}
          >
            Set date to January 1 2018
          </button>
        </p>
      </div>
    );
  }
}

export default DatepickerContainer;
