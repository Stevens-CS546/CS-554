const RecipeForm = React.createClass({
    getInitialState() {
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
    changeTitle(e) {
        this.setState({title: e.target.value});
    },
    changeDescription(e) {
        this.setState({description: e.target.value});
    },
    addStep(e) {
        let steps = this
            .state
            .steps
            .concat([this.state.newStepText]);

        this.setState({steps: steps, newStepText: ""});
    },
    changeStep(e) {
        this.setState({newStepText: e.target.value});
    },
    addIngredient(e) {
        let newIngredient = {
            displayTitle: this.state.newIngredient,
            description: this.state.newIngredientDescription,
            quantity: this.state.newIngredientQuantity,
            unit: this.state.newIngredientUnit
        };

        let ingredients = this
            .state
            .ingredients
            .concat([newIngredient]);

        let stateChanges = {
            ingredients: ingredients,
            newIngredient: "",
            newIngredientQuantity: "",
            newIngredientUnit: "grams",
            newIngredientDescription: ""
        };

        this.setState(stateChanges);
    },
    changeNewIngredientText(e) {
        this.setState({newIngredient: e.target.value});
    },
    changeNewIngredientQuantity(e) {
        this.setState({newIngredientQuantity: e.target.value});
    },
    changeNewIngredientUnit(e) {
        this.setState({newIngredientUnit: e.target.value});
    },
    changeNewIngredientDescription(e) {
        this.setState({newIngredientDescription: e.target.value});
    },
    addRecipe(e) {
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
            success: (newRecipe) => {
                console.log(newRecipe);
                this.setState(this.getInitialState());
                this
                    .props
                    .onRecipeCreation(newRecipe);
            },
            error: (xhr, status, err) => {
                this.setState({error: xhr.responseJSON.error});
            }
        });

    },
    render() {
        let newTitleText = `${this.state.title || 'New Recipe'}`;

        let errorBox = this.state.error
            ? (
                <div className="alert alert-danger">{this.state.error}</div>
            )
            : undefined;

        return (
            <div className="recipe row">
                <div className="col-sm-6">
                    <h3>Add a New Recipe</h3>
                    <hr/>
                    <form onSubmit={this.addRecipe}>
                        <h4>Recipe Info</h4>
                        <div className="form-group">
                            <label htmlFor="newTitle">Title</label>
                            <input
                                className="form-control"
                                id="newTitle"
                                placeholder="New Recipe"
                                onChange={this.changeTitle}
                                value={this.state.title}
                                type="text"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newDescription">Description</label>
                            <textarea
                                className="form-control"
                                id="newDescription"
                                placeholder="Recipe description"
                                onChange={this.changeDescription}>{this.state.description}</textarea>
                        </div>
                        <hr/>
                        <h4>Ingredient Info</h4>
                        <div className="form-group">
                            <label htmlFor="newIngredientText">New Ingredient</label>
                            <input
                                className="form-control"
                                type="text"
                                id="newIngredientText"
                                placeholder="New Ingredient"
                                value={this.state.newIngredient}
                                onChange={this.changeNewIngredientText}/>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label htmlFor="newUnit" className="sr-only">New Quantity</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="newUnit"
                                        placeholder="Quantity"
                                        value={this.state.newIngredientQuantity}
                                        onChange={this.changeNewIngredientQuantity}/>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="newUnit" className="sr-only">New Unit</label>
                                    <select
                                        id="newUnit"
                                        className="form-control"
                                        onChange={this.changeNewIngredientUnit}>
                                        <option value="grams">Grams</option>
                                        <option value="milligrams">Milligrams</option>
                                        <option value="milliliters">Millileters</option>
                                        <option value="ounces">Ounces</option>
                                        <option value="pounds">Pounds</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newIngredientDescription">Description</label>
                            <textarea
                                className="form-control"
                                id="newIngredientDescription"
                                placeholder="Ingredient Info"
                                value={this.state.newIngredientDescription}
                                onChange={this.changeNewIngredientDescription}>{this.state.newIngredientDescription}</textarea>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="button" onClick={this.addIngredient}>Add Ingredient</button>
                        </div>
                        <hr/>
                        <h4>Steps</h4>
                        <div className="form-group">
                            <label htmlFor="newStepText">New Step</label>
                            <textarea
                                className="form-control"
                                type="text"
                                id="newIngredientText"
                                placeholder="New Step Instructions"
                                value={this.newStepText}
                                onChange={this.changeStep}></textarea>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="button" onClick={this.addStep}>Add Step</button>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-default">Add Recipe</button>
                        </div>
                    </form>
                    {errorBox}
                </div>
                <div className="col-sm-6">
                    <h3>Preview ({this.state.ingredients.length} ingredients, {this.state.steps.length} steps)</h3>
                    <hr/>
                    <Recipe
                        title={newTitleText}
                        description={this.state.description}
                        steps={this.state.steps}
                        ingredients={this.state.ingredients}Recipe ></Recipe>
                </div>
            </div>
        );
    }
});