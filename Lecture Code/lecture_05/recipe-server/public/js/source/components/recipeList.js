const RecipeList = React.createClass({
    getInitialState: function () {
        return {recipes: []};
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (recipeList) => {
                this.setState({recipes: recipeList});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    },
    addNewRecipe() {
        alert("list added a new recipe");
    },
    render: function () {
        let recipeList = this.state.recipes;
        let recipes = recipeList.map((recipe) => {
            return (
                <Recipe
                    title={recipe.title}
                    description={recipe.description}
                    id={recipe.id}
                    steps={recipe.steps}
                    ingredients={recipe.ingredients}></Recipe>
            );
        });

        return (
            <div className="recipe">
                {recipes}
                <hr />
                <RecipeForm newRecipeUrl={this.props.url} onRecipeCreation={this.addNewRecipe} />
            </div>
        );
    }
});

ReactDOM.render(
    <RecipeList url="/recipes"/>, document.getElementById('content'));