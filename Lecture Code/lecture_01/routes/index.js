const constructorMethod = (app) => {
    app.use("*", (req, res) => {
        response.render("home", { pageTitle: "Advanced CSS3" });
    })
};

module.exports = constructorMethod;