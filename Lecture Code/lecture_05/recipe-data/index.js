const recipeCollection = require("./recipeCollection");

let exportedMethods = {
    getAllRecipes() {
        return recipeCollection().then((recipes) => {
            return recipes
                .find()
                .toArray();
        });
    },
    getRecipe(id) {
        return recipeCollection().then((recipes) => {
            return recipes.findOne({_id: id})
        })
    },
    addRecipe(recipe) {
        return recipeCollection().then((recipes) => {
            let newRecipe = JSON.parse(JSON.stringify(recipe));

            newRecipe.ingredients.forEach(ingredient => {
                ingredient.systemTitle = ingredient.displayTitle.toString();
            });

            newRecipe.relatedIngredients = [];
            newRecipe.imageUrls = [];            

            return recipes.insertOne(recipe)
        }).then((recipe) => {
            return this.getRecipe(recipe.insertedId);
        });
    },
    createRecipeRelationship(firstRecipe, firstMatchAmount, secondRecipe, secondMatchAmount) {
        return recipeCollection().then((recipes) => {
            return recipes.updateOne({
                _id: firstRecipe
            }, {
                $addToSet: {
                    relatedRecipes: {
                        _id: secondRecipe,
                        amount: firstMatchAmount
                    }
                }
            }).then(() => {
                recipes.updateOne({
                    _id: secondRecipe
                }, {
                    $addToSet: {
                        relatedRecipes: {
                            _id: firstRecipe,
                            amount: secondMatchAmount
                        }
                    }
                })
            }).then(() => {
                return recipes.find({
                    _id: [firstRecipe, secondRecipe]
                })
            });
        });
    },
    findRecipesWithIngredient(systemTitle) {
        return recipeCollection().then((recipes) => {
            return recipes
                .find({"ingredients.systemTitle": systemTitle})
                .toArray()
        });
    },
    findRecipesWithIngredients(systemTitles) {
        return recipeCollection().then((recipes) => {
            return recipes
                .find({
                "ingredients.systemTitle": {
                    $in: systemTitles
                }
            })
                .toArray()
        });
    },
    addImagesToRecipe(recipeId, imageUrlArray) {
        return recipeCollection().then((recipes) => {
            return recipes.updateOne({
                _id: recipeId
            }, {
                $addToSet: {
                    imageUrls: {
                        $each: imageUrlArray
                    }
                }
            }).then(() => {
                return this.getRecipe(recipeId);
            });
        });
    }
}

module.exports = exportedMethods;