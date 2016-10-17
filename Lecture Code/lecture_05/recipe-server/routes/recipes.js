const express = require('express');
const router = express.Router();
const recipeData = require("recipe-data");
const uuid = require("node-uuid");

router.get("/", (req, res) => {
    recipeData
        .getAllRecipes()
        .then((recipeList) => {
            res.json(recipeList);
        })
        .catch(() => {
            // Something went wrong with the server!
            res.sendStatus(500);
        });
});

router.post("/", (req, res) => {
    let newRecipe = req.body.recipe;

    let redisConnection = req
        .app
        .get("redis");

    let messageId = uuid.v4();
    let killswitchTimeoutId = undefined;

    redisConnection.on(`recipe-created:${messageId}`, (insertedRecipe, channel) => {
        res.json(insertedRecipe);
        redisConnection.off(`recipe-created:${messageId}`);
        redisConnection.off(`recipe-created-failed:${messageId}`);

        clearTimeout(killswitchTimeoutId);
    });

    redisConnection.on(`recipe-created-failed:${messageId}`, (error, channel) => {
        res
            .status(500)
            .json(error);

        redisConnection.off(`recipe-created:${messageId}`);
        redisConnection.off(`recipe-created-failed:${messageId}`);

        clearTimeout(killswitchTimeoutId);
    });

    killswitchTimeoutId = setTimeout(() => {
        redisConnection.off(`recipe-created:${messageId}`);
        redisConnection.off(`recipe-creation-failed:${messageId}`);
        res
            .status(500)
            .json({error: "Timeout error"})
    }, 5000);

    redisConnection.emit(`create-recipe:${messageId}`, {
        requestId: messageId,
        recipe: newRecipe
    });

});

module.exports = router;