const bookRoutes = require("./books");

const constructorMethod = app => {
  app.use("/books", bookRoutes);

  app.use("*", (req, res) => {
    res.redirect("/books");
  });
};

module.exports = constructorMethod;
