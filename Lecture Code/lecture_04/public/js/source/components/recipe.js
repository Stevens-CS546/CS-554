const Recipe = React.createClass({
  getInitialState: function () {
    return { showingDetails: false };
  },
  showMore(e) {
    e.preventDefault();
    this.setState({ showingDetails: true });
  },
  showLess(e) {
    e.preventDefault();
    this.setState({ showingDetails: false });
  },
  render() {
    let bodyContent = undefined;
    let toggler = undefined;
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

      bodyContent = (
        <div>
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
      );
      toggler = (
        <p className="text-center">
          <a onClick={this.showLess} href="">Show Less</a>
        </p>
      );

    } else {
      let words = this.props.description.split(' ');
      bodyContent = (
        <p>
          {words.slice(0, 35).join(" ")}
          {words.length > 35 ? '... ' : undefined}
          {words.length > 35 ? <a onClick={this.showMore}>read on</a> : undefined}
        </p>
      );

      toggler = (
        <p className="text-center">
          <a onClick={this.showMore} href="">Show Details</a>
        </p>
      );
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">{this.props.title}</div>
        <div className="panel-body">
          {bodyContent}
          {toggler}
        </div>
      </div>
    );
  }
});
