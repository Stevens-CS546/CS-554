const path = require("path");
const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const indexPath = path.resolve(__dirname, "src", "index.html");

app.use("/public", static);

app.get("/", (req, res) => {
  res.sendFile(indexPath);
});

app.use("*", (req, res) => res.redirect("/"));

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
