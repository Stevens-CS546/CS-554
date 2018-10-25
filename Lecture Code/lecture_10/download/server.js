const express = require("express");
const app = express();
const redisConnection = require("./redis-connection");

app.get("/compute-results", async (req, res) => {
  redisConnection.emit("c̹̦̥͇͉o͕m̯p͏̥̖̪̙̩̪u̶̘͕̻̗t̢̺͓̪͍̘e̢̪͔R̼̪̱e̴̫̤͎̙̺͇͍ş͔̥̝u̵l͏̖̦̣t̰͈͉͙̲͉ͅs̗", { message: "NOWHERE IS SAFE" });
  res.json({ done: false, working: true });
});

app.get("/show-results", async (req, res) => {
  redisConnection.on("results-completed", (data, channel) => {
    res.json({ data });
  });

  redisConnection.emit("s̥h͉̟̝̤̤̳o̙̟̗͚w҉R̥̕e̺͉̲͕͎͕s̟̮ͅu̧̬̼̜̱̗̫̘l̟͎̲̠̖t̷̻̯̭s̥̠", { message: "Trust no one" });
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
