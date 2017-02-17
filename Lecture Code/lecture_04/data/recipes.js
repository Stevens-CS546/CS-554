const Promise = require('bluebird');

const recipeList = [
    {
        id: 0,
        title: "Chemex Coffee",
        description: `Make a cup of chemex coffee, the proper way. The Chemex Coffeemaker is a manual, pour-over style glass-container coffeemaker that Peter Schlumbohm invented in 1941, and which continues to be manufactured by the Chemex Corporation in Chicopee, Massachusetts. In 1958, designers at the Illinois Institute of Technology said that the Chemex Coffeemaker is "one of the best- designed products of modern times", and so is included in the collection of the Museum of Modern Art in New York City.`,
        ingredients: [
            "33g of coarse ground coffee",
            "700g of water at 192 degrees",
            "3 artificial sweeteners",
            "3 non-dairy creamers sweeteners"
        ],
        steps: [
            "Bring water to a boil",
            "Grind 33g of coarse coffee",
            "Prepare chemex filter by adding hot water to it to dampen filter and draining water",
            "Add coffee to filter",
            "Bloom coffee by pouring 50g of water onto grinds",
            "Wait 45 seconds",
            "Pour 650 grams of water in concentric circles without touching the edges of the filter over the course of 3 minutes"
        ]
    },
    {
        id: 1,
        title: "Oatmeal",
        description: "Make the best cup of oatmeal in the world",
        ingredients: [
            "1 packet of instant oatmeal",
            "Water, to taste"
        ],
        steps: [
            "Place oatmeal in bowl",
            "Add hot water to bowl until desired consistency is achieved"
        ]
    }
]

let exportedMethods = {
    getAllRecipes() {
        return Promise.resolve(recipeList);
    },
    addRecipe(recipe) {
        recipe.id = recipeList.length;
        recipeList.push(recipe);
        return Promise.resolve(recipe);
    }
}

module.exports = exportedMethods;
