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

    const options = days.map(x => (
      <option key={x} value={x}>
        {x}
      </option>
    ));

    return (
      <select value={currentDay} onChange={onPickDay}>
        <option>Select a day</option>
        {options}
      </select>
    );
  }
}
