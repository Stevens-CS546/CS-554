const Recipe = React.createClass({
  getInitialState: function () {
    return {showingDetails: false};
  },
  showMore(e) {
    e.preventDefault();
    e.stopPropagation();
    e
      .nativeEvent
      .stopImmediatePropagation();
    this.setState({showingDetails: true});
  },
  showLess(e) {
    e.preventDefault();
    e.stopPropagation();
    e
      .nativeEvent
      .stopImmediatePropagation();

    this.setState({showingDetails: false});
  },
  render() {
    if (this.state.showingDetails) {
      let steps = this
        .props
        .steps
        .map((step) => {
          return <li>{step}</li>;
        });

      let ingredients = this
        .props
        .ingredients
        .map((step) => {
          return <li>{step}</li>;
        });
        
      return (
        <div className="panel panel-default">
          <div className="panel-heading">{this.props.title}</div>
          <div className="panel-body">
            <p>
              {this.props.description}
            </p>

            <div className="row">
              <div className="col-md-8">
                <ol>
                  {steps}
                </ol>
              </div>
              <div className="col-sm-4">
                <ul>
                  {ingredients}
                </ul>
              </div>
            </div>
          </div>
          <p className="text-center">
            <a onClick={this.showLess} href="">Show Less</a >
          </p>
        </div>
      );
    } else {
      return (
        <div className="panel panel-default">
          <div className="panel-heading">{this.props.title}</div>
          <div className="panel-body">
            <p>
              {this.props.description}
            </p>
            <p className="text-center">
              <a onClick={this.showMore} href="">Show More</a>
            </p>
          </div>
        </div>
      )
    }
  }
});
