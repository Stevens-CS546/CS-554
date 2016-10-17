"use strict";

var Ingredient = React.createClass({
  displayName: "Ingredient",
  render: function render() {
    var description = this.props.description ? React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        this.props.description
      )
    ) : undefined;
    return React.createElement(
      "li",
      null,
      this.props.displayTitle,
      " (",
      this.props.quantity,
      " ",
      this.props.unit,
      ") ",
      description
    );
  }
});
"use strict";

var Recipe = React.createClass({
  displayName: "Recipe",

  getInitialState: function getInitialState() {
    return { showingDetails: false };
  },
  showMore: function showMore(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ showingDetails: true });
  },
  showLess: function showLess(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    this.setState({ showingDetails: false });
  },
  render: function render() {

    var bodyContent = undefined;
    var toggler = undefined;

    if (this.state.showingDetails) {
      var steps = this.props.steps.map(function (step) {
        return React.createElement(
          "li",
          null,
          step
        );
      });

      var ingredients = this.props.ingredients.map(function (ingredient) {
        return React.createElement(Ingredient, ingredient);
      });

      bodyContent = React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          this.props.description
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-8" },
            React.createElement(
              "h2",
              null,
              "Ingredients"
            ),
            React.createElement(
              "ul",
              null,
              ingredients
            ),
            React.createElement(
              "h2",
              null,
              "Steps"
            ),
            React.createElement(
              "ol",
              null,
              steps
            )
          ),
          React.createElement("div", { className: "col-sm-4" })
        )
      );
      toggler = React.createElement(
        "p",
        { className: "text-center" },
        React.createElement(
          "a",
          { onClick: this.showLess, href: "" },
          "Show Less"
        )
      );
    } else {
      bodyContent = React.createElement(
        "p",
        null,
        this.props.description
      );

      toggler = React.createElement(
        "p",
        { className: "text-center" },
        React.createElement(
          "a",
          { onClick: this.showMore, href: "" },
          "Show More"
        )
      );
    }

    return React.createElement(
      "div",
      { className: "panel panel-default" },
      React.createElement(
        "div",
        { className: "panel-heading" },
        this.props.title
      ),
      React.createElement(
        "div",
        { className: "panel-body" },
        bodyContent,
        toggler
      )
    );
  }
});
"use strict";

var RecipeForm = React.createClass({
    displayName: "RecipeForm",
    getInitialState: function getInitialState() {
        return {
            title: "",
            description: "",
            steps: [],
            ingredients: [],
            newStepText: "",
            newIngredient: "",
            newIngredientQuantity: "",
            newIngredientUnit: "grams",
            newIngredientDescription: "",
            error: ""
        };
    },
    changeTitle: function changeTitle(e) {
        this.setState({ title: e.target.value });
    },
    changeDescription: function changeDescription(e) {
        this.setState({ description: e.target.value });
    },
    addStep: function addStep(e) {
        var steps = this.state.steps.concat([this.state.newStepText]);

        this.setState({ steps: steps, newStepText: "" });
    },
    changeStep: function changeStep(e) {
        this.setState({ newStepText: e.target.value });
    },
    addIngredient: function addIngredient(e) {
        var newIngredient = {
            displayTitle: this.state.newIngredient,
            description: this.state.newIngredientDescription,
            quantity: this.state.newIngredientQuantity,
            unit: this.state.newIngredientUnit
        };

        var ingredients = this.state.ingredients.concat([newIngredient]);

        var stateChanges = {
            ingredients: ingredients,
            newIngredient: "",
            newIngredientQuantity: "",
            newIngredientUnit: "grams",
            newIngredientDescription: ""
        };

        this.setState(stateChanges);
    },
    changeNewIngredientText: function changeNewIngredientText(e) {
        this.setState({ newIngredient: e.target.value });
    },
    changeNewIngredientQuantity: function changeNewIngredientQuantity(e) {
        this.setState({ newIngredientQuantity: e.target.value });
    },
    changeNewIngredientUnit: function changeNewIngredientUnit(e) {
        this.setState({ newIngredientUnit: e.target.value });
    },
    changeNewIngredientDescription: function changeNewIngredientDescription(e) {
        this.setState({ newIngredientDescription: e.target.value });
    },
    addRecipe: function addRecipe(e) {
        var _this = this;

        e.preventDefault();

        $.ajax({
            url: this.props.newRecipeUrl,
            dataType: 'json',
            cache: false,
            method: "POST",
            data: {
                recipe: {
                    title: this.state.title,
                    ingredients: this.state.ingredients,
                    description: this.state.description,
                    steps: this.state.steps
                }
            },
            success: function success(newRecipe) {
                console.log(newRecipe);
                _this.setState(_this.getInitialState());
                _this.props.onRecipeCreation(newRecipe);
            },
            error: function error(xhr, status, err) {
                _this.setState({ error: xhr.responseJSON.error });
            }
        });
    },
    render: function render() {
        var newTitleText = "" + (this.state.title || 'New Recipe');

        var errorBox = this.state.error ? React.createElement(
            "div",
            { className: "alert alert-danger" },
            this.state.error
        ) : undefined;

        return React.createElement(
            "div",
            { className: "recipe row" },
            React.createElement(
                "div",
                { className: "col-sm-6" },
                React.createElement(
                    "h3",
                    null,
                    "Add a New Recipe"
                ),
                React.createElement("hr", null),
                React.createElement(
                    "form",
                    { onSubmit: this.addRecipe },
                    React.createElement(
                        "h4",
                        null,
                        "Recipe Info"
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { htmlFor: "newTitle" },
                            "Title"
                        ),
                        React.createElement("input", {
                            className: "form-control",
                            id: "newTitle",
                            placeholder: "New Recipe",
                            onChange: this.changeTitle,
                            value: this.state.title,
                            type: "text" })
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { htmlFor: "newDescription" },
                            "Description"
                        ),
                        React.createElement(
                            "textarea",
                            {
                                className: "form-control",
                                id: "newDescription",
                                placeholder: "Recipe description",
                                onChange: this.changeDescription },
                            this.state.description
                        )
                    ),
                    React.createElement("hr", null),
                    React.createElement(
                        "h4",
                        null,
                        "Ingredient Info"
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { htmlFor: "newIngredientText" },
                            "New Ingredient"
                        ),
                        React.createElement("input", {
                            className: "form-control",
                            type: "text",
                            id: "newIngredientText",
                            placeholder: "New Ingredient",
                            value: this.state.newIngredient,
                            onChange: this.changeNewIngredientText })
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col-sm-6" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "newUnit", className: "sr-only" },
                                    "New Quantity"
                                ),
                                React.createElement("input", {
                                    className: "form-control",
                                    type: "text",
                                    id: "newUnit",
                                    placeholder: "Quantity",
                                    value: this.state.newIngredientQuantity,
                                    onChange: this.changeNewIngredientQuantity })
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-6" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "newUnit", className: "sr-only" },
                                    "New Unit"
                                ),
                                React.createElement(
                                    "select",
                                    {
                                        id: "newUnit",
                                        className: "form-control",
                                        onChange: this.changeNewIngredientUnit },
                                    React.createElement(
                                        "option",
                                        { value: "grams" },
                                        "Grams"
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "milligrams" },
                                        "Milligrams"
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "milliliters" },
                                        "Millileters"
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "ounces" },
                                        "Ounces"
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "pounds" },
                                        "Pounds"
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
                            { htmlFor: "newIngredientDescription" },
                            "Description"
                        ),
                        React.createElement(
                            "textarea",
                            {
                                className: "form-control",
                                id: "newIngredientDescription",
                                placeholder: "Ingredient Info",
                                value: this.state.newIngredientDescription,
                                onChange: this.changeNewIngredientDescription },
                            this.state.newIngredientDescription
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", type: "button", onClick: this.addIngredient },
                            "Add Ingredient"
                        )
                    ),
                    React.createElement("hr", null),
                    React.createElement(
                        "h4",
                        null,
                        "Steps"
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { htmlFor: "newStepText" },
                            "New Step"
                        ),
                        React.createElement("textarea", {
                            className: "form-control",
                            type: "text",
                            id: "newIngredientText",
                            placeholder: "New Step Instructions",
                            value: this.newStepText,
                            onChange: this.changeStep })
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", type: "button", onClick: this.addStep },
                            "Add Step"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "button",
                            { type: "submit", className: "btn btn-default" },
                            "Add Recipe"
                        )
                    )
                ),
                errorBox
            ),
            React.createElement(
                "div",
                { className: "col-sm-6" },
                React.createElement(
                    "h3",
                    null,
                    "Preview (",
                    this.state.ingredients.length,
                    " ingredients, ",
                    this.state.steps.length,
                    " steps)"
                ),
                React.createElement("hr", null),
                React.createElement(Recipe, {
                    title: newTitleText,
                    description: this.state.description,
                    steps: this.state.steps,
                    ingredients: this.state.ingredients, Recipe: true })
            )
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
    addNewRecipe: function addNewRecipe(newRecipe) {
        var recipes = this.state.recipes;
        var newRecipeList = recipes.concat([newRecipe]);
        this.setState({ recipes: newRecipeList });
    },

    render: function render() {
        var recipeList = this.state.recipes;
        var recipes = recipeList.map(function (recipe) {
            return React.createElement(Recipe, {
                title: recipe.title,
                description: recipe.description,
                id: recipe.id,
                steps: recipe.steps,
                ingredients: recipe.ingredients,
                displayImages: recipe.imageUrls,
                relatedRecipes: recipe.relatedRecipes
            });
        });

        return React.createElement(
            "div",
            { className: "recipe" },
            recipes,
            React.createElement("hr", null),
            React.createElement(RecipeForm, { newRecipeUrl: this.props.url, onRecipeCreation: this.addNewRecipe })
        );
    }
});

ReactDOM.render(React.createElement(RecipeList, { url: "/recipes" }), document.getElementById('content'));