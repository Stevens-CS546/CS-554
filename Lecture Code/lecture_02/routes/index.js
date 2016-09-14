const constructorMethod = (app) => {
    app.use("*", (req, res) => {
        res.render("home", { pageTitle: "Advanced CSS3" });
    })
};

module.exports = constructorMethod;