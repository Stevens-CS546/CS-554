const recipeRoutes = require("./recipes");
const commentRoutes = require("./comments");

const constructorMethod = (app) => {
    app.use("/recipes", recipeRoutes);
    app.use("/comments", commentRoutes);

    app.get("/", (req, res) => {
        res.render("home", {});
    });
    
    app.use("*", (req, res) => {
        res.redirect("/");
    })
};

module.exports = constructorMethod;