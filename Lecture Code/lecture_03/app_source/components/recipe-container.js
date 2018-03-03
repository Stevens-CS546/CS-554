const RecipeContainer = React.createClass({
  getInitialState: function() {
    return { recipes: [] };
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache: false,
      success: recipeList => {
        this.setState({ recipes: recipeList });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },

  render: function() {
    return (
      <div className="recipe">
        <RecipeList recipes={this.state.recipes} />
        <hr />
        <RecipeForm />
      </div>
    );
  }
});
