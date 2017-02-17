"use strict";

var AppComponent = function AppComponent() {
    return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
            "div",
            { className: "col-sm-8" },
            React.createElement(RecipeList, { url: "/recipes" })
        ),
        React.createElement(
            "div",
            { className: "col-sm-4" },
            "Comment box goes here"
        )
    );
};
"use strict";

var Recipe = function Recipe(_ref) {
  var steps = _ref.steps,
      title = _ref.title,
      description = _ref.description,
      ingredients = _ref.ingredients;

  var viewSteps = steps.map(function (step) {
    return React.createElement(
      "li",
      null,
      step
    );
  });

  var viewIngredients = ingredients.map(function (step) {
    return React.createElement(
      "li",
      null,
      step
    );
  });

  return React.createElement(
    "div",
    { className: "panel panel-default" },
    React.createElement(
      "div",
      { className: "panel-heading" },
      title
    ),
    React.createElement(
      "div",
      { className: "panel-body" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          description
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-8" },
            React.createElement(
              "ol",
              null,
              viewSteps
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-4" },
            React.createElement(
              "ul",
              null,
              viewIngredients
            )
          )
        )
      )
    )
  );
};
"use strict";

var RecipeForm = React.createClass({
    displayName: "RecipeForm",
    getInitialState: function getInitialState() {
        return {
            title: "",
            description: "",
            steps: [],
            ingredients: [], newIngredient: ""
        };
    },
    changeTitle: function changeTitle(e) {
        this.setState({ title: e.target.value });
    },
    changeDescription: function changeDescription(e) {
        this.setState({ description: e.target.value });
    },
    addIngredient: function addIngredient(e) {
        var ingredients = this.state.ingredients.concat([this.state.newIngredient]);

        this.setState({ ingredients: ingredients, newIngredient: "" });
    },
    changeNewIngredientText: function changeNewIngredientText(e) {
        this.setState({ newIngredient: e.target.value });
    },
    render: function render() {
        var newTitleText = "New Recipe: " + (this.state.title || '') + " (" + this.state.ingredients.length + " ingredients, " + this.state.steps.length + " steps)";

        return React.createElement(
            "div",
            { className: "recipe" },
            React.createElement(
                "h3",
                null,
                "Add a New Recipe"
            ),
            React.createElement(
                "div",
                { className: "form-horizontal" },
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "newTitle", className: "col-sm-3 control-label" },
                        "Title"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement("input", {
                            className: "form-control",
                            id: "newTitle",
                            placeholder: "New Recipe",
                            onChange: this.changeTitle,
                            value: this.state.title,
                            type: "text" })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "newDescription", className: "col-sm-3 control-label" },
                        "Description"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement("textarea", {
                            className: "form-control",
                            id: "newDescription",
                            placeholder: "Recipe description",
                            onChange: this.changeDescription })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "newIngredientText", className: "col-sm-3 control-label" },
                        "New Ingredient"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement(
                            "div",
                            { className: "input-group" },
                            React.createElement("input", {
                                className: "form-control",
                                type: "text",
                                id: "newIngredientText",
                                placeholder: "New Ingredient",
                                value: this.state.newIngredient,
                                onChange: this.changeNewIngredientText }),
                            React.createElement(
                                "span",
                                { className: "input-group-btn" },
                                React.createElement(
                                    "button",
                                    { className: "btn btn-primary", type: "button", onClick: this.addIngredient },
                                    "Add Ingredient"
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "newStepText", className: "col-sm-3 control-label" },
                        "New Step"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement("textarea", {
                            className: "form-control",
                            type: "text",
                            id: "newIngredientText",
                            placeholder: "New Step Instructions" })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "div",
                        { className: "col-sm-offset-3 col-sm-9" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", type: "button" },
                            "Add Step"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "div",
                        { className: "col-sm-12" },
                        React.createElement(
                            "button",
                            { type: "submit", className: "btn btn-default" },
                            "Add Recipe"
                        )
                    )
                )
            ),
            React.createElement(Recipe, {
                title: newTitleText,
                description: this.state.description,
                steps: this.state.steps,
                ingredients: this.state.ingredients })
        );
    }
});
"use strict";

var RecipeList = React.createClass({
    displayName: "RecipeList",

    getInitialState: function getInitialState() {
        return { recipes: [] };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function success(recipeList) {
                _this.setState({ recipes: recipeList });
            },
            error: function error(xhr, status, err) {
                console.error(_this.props.url, status, err.toString());
            }
        });
    },
    render: function render() {
        var recipeList = this.state.recipes;
        var recipes = recipeList.map(function (recipe) {
            return React.createElement(Recipe, {
                key: recipe.id,
                title: recipe.title,
                description: recipe.description,
                id: recipe.id,
                steps: recipe.steps,
                ingredients: recipe.ingredients });
        });

        return React.createElement(
            "div",
            { className: "recipe" },
            recipes,
            React.createElement("hr", null),
            React.createElement(RecipeForm, null)
        );
    }
});
'use strict';

ReactDOM.render(React.createElement(AppComponent, null), document.getElementById('content'));