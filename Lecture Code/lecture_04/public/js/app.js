class Datepicker extends React.Component {
  constructor(props) {
    super(props);

    this.getYearFromProps = () => {
      return this.props.date.getFullYear();
    };

    this.getMonthFromProps = () => {
      return this.props.date.getMonth() + 1;
    };

    this.getDayFromProps = () => {
      return this.props.date.getDate();
    };

    this.updateYear = event => {
      const newYear = parseInt(event.target.value);
      const month = this.getMonthFromProps();
      const currentDay = this.getDayFromProps();
      const maxDaysInNewYearMonth = this.numberOfDaysInMonth(newYear, month);
      const newDay = Math.min(maxDaysInNewYearMonth, currentDay);
      const newDate = new Date(newYear, month - 1, newDay);
      this.props.onDateUpdate(newDate);
    };

    this.updateMonth = event => {
      const newMonth = parseInt(event.target.value);
      const year = this.getYearFromProps();
      const currentDay = this.getDayFromProps();
      const maxDaysInNewYearMonth = this.numberOfDaysInMonth(year, newMonth);
      const newDay = Math.min(maxDaysInNewYearMonth, currentDay);
      const newDate = new Date(year, newMonth - 1, newDay);
      this.props.onDateUpdate(newDate);
    };

    this.updateDay = event => {
      const year = this.getYearFromProps();
      const month = this.getMonthFromProps();
      const currentDay = parseInt(event.target.value);
      const maxDaysInNewYearMonth = this.numberOfDaysInMonth(year, month);
      const newDay = Math.min(maxDaysInNewYearMonth, currentDay);
      const newDate = new Date(year, month - 1, newDay);
      this.props.onDateUpdate(newDate);
    };

    const now = new Date();
    this.state = {
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth() + 1,
      currentDay: now.getDate()
    };
  }

  numberOfDaysInMonth(year, month) {
    if (year % 4 === 0 && month === 2) return 29;
    if (month === 2) return 28;
    if (month === 4 || month === 6 || month === 9 || month === 11) return 30;
    return 31;
  }

  render() {
    const year = this.getYearFromProps();
    const month = this.getMonthFromProps();
    const day = this.getDayFromProps();
    const maxDaysInYearMonth = this.numberOfDaysInMonth(year, month);
    return React.createElement(
      "div",
      null,
      React.createElement(DatepickerYear, {
        onPickYear: this.updateYear,
        currentYear: year
      }),
      React.createElement(DatepickerMonth, {
        onPickMonth: this.updateMonth,
        currentMonth: month
      }),
      React.createElement(DatepickerDay, {
        onPickDay: this.updateDay,
        daysInMonth: maxDaysInYearMonth,
        currentDay: day
      })
    );
  }
}
class DatepickerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.updateDate = newDate => {
      this.setState({
        date: newDate
      });
    };

    this.updateFromContainer = () => {
      const date = new Date(2018, 0, 1);
      this.setState({
        date
      });
    };

    const now = new Date();
    this.state = {
      date: now
    };
  }

  render() {
    const { date } = this.state;
    const dateString = date.toDateString();
    return React.createElement(
      "div",
      null,
      React.createElement(Datepicker, {
        date: date,
        onDateUpdate: this.updateDate
      }),
      React.createElement(
        "p",
        null,
        React.createElement("em", null, "You have selected ", dateString, ".")
      ),
      React.createElement(
        "p",
        null,
        React.createElement(
          "button",
          {
            className: "btn btn-primary",
            onClick: this.updateFromContainer
          },
          "Set date to January 1 2018"
        )
      )
    );
  }
}
class DatepickerDay extends React.Component {
  constructor(props) {
    super(props);
    const { daysInMonth } = props;
    this.state = {
      days: this.getDaysInMonth(daysInMonth)
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.daysInMonth !== this.props.daysInMonth) {
      this.setState({
        days: this.getDaysInMonth(this.props.daysInMonth)
      });
    }
  }

  getDaysInMonth(daysInMonth) {
    return Array(daysInMonth)
      .fill(null)
      .map((u, i) => i + 1);
  }

  render() {
    const { days } = this.state;
    const { currentDay, onPickDay } = this.props;
    const options = days.map(x =>
      React.createElement(
        "option",
        {
          key: x,
          value: x
        },
        x
      )
    );
    return React.createElement(
      "select",
      {
        value: currentDay,
        onChange: onPickDay
      },
      React.createElement("option", null, "Select a day"),
      options
    );
  }
}
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
    const options = Object.keys(months).map(x =>
      React.createElement(
        "option",
        {
          key: x,
          value: x
        },
        months[x]
      )
    );
    return React.createElement(
      "select",
      {
        value: currentMonth,
        onChange: onPickMonth
      },
      React.createElement("option", null, "Select a month"),
      options
    );
  }
}
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
    const options = years.map(year =>
      React.createElement(
        "option",
        {
          key: year,
          value: year
        },
        year
      )
    );
    return React.createElement(
      "select",
      {
        value: currentYear,
        onChange: onPickYear
      },
      React.createElement("option", null, "Select a year"),
      options
    );
  }
}
ReactDOM.render(
  React.createElement(DatepickerContainer, null),
  document.getElementById("datepicker-example")
);
