import React from "react";

class DatepickerMonth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      months: {
        1: "January",
        2: "Feburary",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
      }
    };
  }

  render() {
    const { currentMonth, onPickMonth } = this.props;

    const { months } = this.state;
    const options = Object.keys(months).map(x => (
      <option key={x} value={x}>
        {months[x]}
      </option>
    ));

    return (
      <select value={currentMonth} onChange={onPickMonth}>
        <option>Select a month</option>
        {options}
      </select>
    );
  }
}

export default DatepickerMonth;
