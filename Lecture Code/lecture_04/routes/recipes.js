const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;

router.get("/", (req, res) => {
    recipeData.getAllRecipes().then((recipeList) => {
        res.json(recipeList);
    }).catch(() => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
    let newRecipe = req.body.recipe;

    recipeData.addRecipe(newRecipe).then((recipe) => {
        res.json(recipe);
    }).catch(() => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

module.exports = router;