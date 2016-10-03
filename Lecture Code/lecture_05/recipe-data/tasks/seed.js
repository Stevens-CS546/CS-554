const recipeCollection = require("../recipeCollection");
const recipeData = require("../");

const recipeList = [
    {
        title: "Chemex Coffee",
        description: "Make a cup of chemex coffee, the proper way",
        ingredients: [
            {
                displayTitle: "Coffee",
                systemTitle: "coffee",
                description: "Make sure it's coarsely and freshly ground",
                quantity: "33",
                unit: "grams"
            }, {
                displayTitle: "Water",
                systemTitle: "water",
                description: "Heated to 196 degrees",
                quantity: "700",
                unit: "grams"
            }, {
                displayTitle: "Splenda",
                systemTitle: "splenda",
                description: "May substitute with other artificial sweeteners",
                quantity: "3",
                unit: "packets"
            }, {
                displayTitle: "Heavy Whipping Cream",
                systemTitle: "heavy whipping cream",
                description: "May substitute with non-dairy creamers",
                quantity: "1",
                unit: "tbsp"
            }
        ],
        steps: [
            "Bring water to a boil", "Grind 33g of coarse coffee", "Prepare chemex filter by adding hot water to it to dampen filter and draining wa" +
                    "ter",
            "Add coffee to filter",
            "Bloom coffee by pouring 50g of water onto grinds",
            "Wait 45 seconds",
            "Pour 650 grams of water in concentric circles without touching the edges of the " +
                    "filter over the course of 3 minutes"
        ],
        relatedRecipes: [],
        imageUrls: []
    }, {
        title: "Oatmeal",
        description: "Make the best cup of oatmeal in the world",
        ingredients: [
            {
                displayTitle: "Instant Oatmeal",
                systemTitle: "instant oatmeal",
                description: "May substitute with rolled oats",
                quantity: "1",
                unit: "packet"
            }, {
                displayTitle: "Water",
                systemTitle: "water",
                description: "Boiling water",
                quantity: "300",
                unit: "mg"
            }
        ],
        steps: [
            "Place oatmeal in bowl", "Add hot water to bowl until desired consistency is achieved"
        ],
        relatedRecipes: [],
        imageUrls: []
    }
];

recipeCollection().then((recipes) => {
    return recipes
        .removeMany({})
        .then(() => {
            return recipes;
        });
}).then((recipes) => {
    let allRecipes = recipeList.map(recipe => {
        return recipeData.addRecipe(recipe);
    });

    return Promise.all(allRecipes);
}).then((newRecipes) => {
    // match on water
    return recipeData.createRecipeRelationship(newRecipes[0]._id, newRecipes[1]._id);
}).then(() => {
    return recipeData.getAllRecipes();
}).then(console.log);
