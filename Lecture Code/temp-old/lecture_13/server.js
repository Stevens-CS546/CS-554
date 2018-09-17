const express = require("express");
const app = express();
const path = require("path");
const recipeData = require("./data");

const recipePhotos = express.static(path.resolve("recipe-photos"));

const recipeRouter = express.Router();

recipeRouter.get("/", (req, res) => {
  return recipeData.getAll().then(allRecipes => {
    res.json(allRecipes);
  });
});

recipeRouter.get("/:id", (req, res) => {
  return recipeData
    .getOne(parseInt(req.params.id))
    .then(recipe => {
      res.json(recipe);
    })
    .catch(error => {
      res.status(404).json({ error: error });
    });
});

app.use("/photos", recipePhotos);
app.use("/api/recipes", recipeRouter);

app.use("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(2112, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:2112");
});
