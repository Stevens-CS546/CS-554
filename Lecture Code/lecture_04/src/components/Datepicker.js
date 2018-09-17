class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();

    this.state = {
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth() + 1,
      currentDay: now.getDate()
    };
  }

  getYearFromProps = () => {
    return this.props.date.getFullYear();
  };

  getMonthFromProps = () => {
    return this.props.date.getMonth() + 1;
  };

  getDayFromProps = () => {
    return this.props.date.getDate();
  };

  numberOfDaysInMonth(year, month) {
    if (year % 4 === 0 && month === 2) return 29;
    if (month === 2) return 28;

    if (month === 4 || month === 6 || month === 9 || month === 11) return 30;

    return 31;
  }

  updateYear = event => {
    const newYear = parseInt(event.target.value);
    const month = this.getMonthFromProps();
    const currentDay = this.getDayFromProps();

    const maxDaysInNewYearMonth = this.numberOfDaysInMonth(newYear, month);
    const newDay = Math.min(maxDaysInNewYearMonth, currentDay);
    const newDate = new Date(newYear, month - 1, newDay);

    this.props.onDateUpdate(newDate);
  };

  updateMonth = event => {
    const newMonth = parseInt(event.target.value);
    const year = this.getYearFromProps();
    const currentDay = this.getDayFromProps();

    const maxDaysInNewYearMonth = this.numberOfDaysInMonth(year, newMonth);
    const newDay = Math.min(maxDaysInNewYearMonth, currentDay);
    const newDate = new Date(year, newMonth - 1, newDay);

    this.props.onDateUpdate(newDate);
  };

  updateDay = event => {
    const year = this.getYearFromProps();
    const month = this.getMonthFromProps();
    const currentDay = parseInt(event.target.value);

    const maxDaysInNewYearMonth = this.numberOfDaysInMonth(year, month);
    const newDay = Math.min(maxDaysInNewYearMonth, currentDay);
    const newDate = new Date(year, month - 1, newDay);

    this.props.onDateUpdate(newDate);
  };

  render() {
    const year = this.getYearFromProps();
    const month = this.getMonthFromProps();
    const day = this.getDayFromProps();

    const maxDaysInYearMonth = this.numberOfDaysInMonth(year, month);

    return (
      <div>
        <DatepickerYear onPickYear={this.updateYear} currentYear={year} />
        <DatepickerMonth onPickMonth={this.updateMonth} currentMonth={month} />
        <DatepickerDay
          onPickDay={this.updateDay}
          daysInMonth={maxDaysInYearMonth}
          currentDay={day}
        />
      </div>
    );
  }
}
