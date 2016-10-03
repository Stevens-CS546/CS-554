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
        .map((ingredient) => {
          return <Ingredient {...ingredient}></Ingredient>;
        });

      bodyContent = (
        <div>
          <p>
            {this.props.description}
          </p>
          <div className="row">
            <div className="col-md-8">
              <h2>Ingredients</h2>
              <ul>
                {ingredients}
              </ul>

              <h2>Steps</h2>
              <ol>
                {steps}
              </ol>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      );
      toggler = (
        <p className="text-center">
          <a onClick={this.showLess} href="">Show Less</a >
        </p>
      );

    } else {
      bodyContent = (
        <p>
          {this.props.description}
        </p>
      );

      toggler = (
        <p className="text-center">
          <a onClick={this.showMore} href="">Show More</a>
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
