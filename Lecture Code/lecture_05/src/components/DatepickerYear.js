import React from "react";

class DatepickerYear extends React.Component {
  constructor(props) {
    super(props);

    const years = [];

    const thisYear = new Date().getFullYear();

    for (let i = thisYear - 20; i < thisYear + 20; i++) {
      years.push(i);
    }

    this.state = {
      years: years
    };
  }

  render() {
    const { onPickYear, currentYear } = this.props;

    const { years } = this.state;
    const options = years.map(year => (
      <option key={year} value={year}>
        {year}
      </option>
    ));

    return (
      <select value={currentYear} onChange={onPickYear}>
        <option>Select a year</option>
        {options}
      </select>
    );
  }
}

export default DatepickerYear;
