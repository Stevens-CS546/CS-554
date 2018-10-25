const express = require("express");
const app = express();
const path = require("path");

app.use("/lib", express.static("lib"));
app.use("/assets", express.static("dist"));

// const static = express.static();
app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "pages", "dedicated-worker.html"))
);

app.get("/shared-worker", (req, res) =>
  res.sendFile(path.resolve(__dirname, "pages", "shared-worker.html"))
);

app.get("/shared-frame", (req, res) =>
  res.sendFile(path.resolve(__dirname, "pages", "shared-worker-frame.html"))
);

app.listen(3000, () => console.log("Example app listening on port 3000!"));
