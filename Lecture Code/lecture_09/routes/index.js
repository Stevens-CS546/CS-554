const fileRoutes = require("./files");

const constructorMethod = app => {
  app.use("/files", fileRoutes);

  app.get("/", (req, response) => {
    response.render("home");
  });

  app.use("*", (req, response) => {
    response.sendStatus(404);
  });
};

module.exports = constructorMethod;
