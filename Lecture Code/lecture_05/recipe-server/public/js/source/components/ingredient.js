const Ingredient = React.createClass({
  render() {
    let description = this.props.description ? 
      (<ul><li>{this.props.description}</li></ul>) : undefined;
    return (
      <li>{this.props.displayTitle} ({this.props.quantity} {this.props.unit}) {description}</li>
    );
  }
});
