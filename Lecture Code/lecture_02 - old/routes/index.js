const constructorMethod = app => {
  app.use("/flex", (req, response) => {
    response.render("flexbox", { pageTitle: "Flexbox Stuff" });
  });

  app.use("*", (req, response) => {
    response.render("home", { pageTitle: "Advanced CSS3" });
  });
};

module.exports = constructorMethod;
