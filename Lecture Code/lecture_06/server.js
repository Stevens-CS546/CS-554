const bluebird = require("bluebird");
const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const makeTestPromise = () => {
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      fulfill({ status: "Good" });
    }, 4000);
  });
};

app.get("/old", (req, res) => {
  let makeTestPromiseResult = makeTestPromise();

  makeTestPromiseResult.then(result => {
    res.json(result);
  });
});

app.get("/", async (req, res, next) => {
  /* Old style */
  /*
  client.getAsync("homePage").then(cacheForHomePageExists => {
    res.send(cacheForHomePageExists);
    if (cacheForHomePageExists) {
      res.send(cacheForHomePageExists);
    } else {
      next();
    }
  });*/

  ////////////////////////////////////

  /* New style, effectively identical to old style */
  let cacheForHomePageExists = await client.getAsync("homePage");
  if (cacheForHomePageExists) {
    res.send(cacheForHomePageExists);
  } else {
    next();
  }
});

app.get("/", async (req, res) => {
  let result = makeTestPromise();
  let secondResult = makeTestPromise();
  let bothResults = await Promise.all([result, secondResult]);

  res.json(bothResults);
  let cachedForHomePage = await client.setAsync(
    "homePage",
    JSON.stringify(bothResults)
  );
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
