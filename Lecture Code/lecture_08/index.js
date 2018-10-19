const bluebird = require("bluebird");
const flat = require("flat");
const unflatten = flat.unflatten;
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const main = async () => {
  let sayHello = await client.setAsync(
    "hello",
    " FROM THE OTHER SIIIIIIIIIIDE"
  );
  let hello = await client.getAsync("hello");
  console.log(`hello, ${hello}`);

  let doesHelloExist = await client.existsAsync("hello");
  console.log(`doesHelloExist ? ${doesHelloExist === 1}`);

  let doesPikachuExist = await client.existsAsync("pikachu");
  console.log(`doesPikachuExist ? ${doesPikachuExist === 1}`);

  let setResult = await client.setAsync("goodnight", "moon");
  console.log(setResult);

  let batchResult = await client
    .multi()
    .set("favoriteDrink", "coffee")
    .set("favoriteFood", "steak")
    .set("cake", "is a lie")
    .execAsync();
  console.log(batchResult);

  let multiResult = await client.mgetAsync(
    "favoriteDrink",
    "favoriteFood",
    "cake",
    "goodnight",
    "hello"
  );
  console.log(multiResult);

  let deleteHello = await client.delAsync("hello");
  console.log(deleteHello);

  doesHelloExist = await client.existsAsync("hello");
  console.log(`doesHelloExist ? ${doesHelloExist === 1}`);

  let bio = {
    name: {
      first: "Phil",
      last: "Barresi"
    },
    goal: {
      desc: "TO BE THE VERY BEST, LIKE NO ONE EVER WAS!",
      test: "TO CATCH THEM IS MY REAL TEST -- ",
      cause: "TO TRAIN THEM IS MY CAUUUUUSE!"
    },
    hobbies: ["making coffee", "making low carb recipes", "soccer"],
    "education.college": {
      name: "Stevens"
    },
    "hobbiesAsObject[]": {
      "0": "making coffee",
      "1": "making low carb recipes",
      sport: "soccer"
    },
    age: 24
  };

  let flatBio = flat(bio);
  let hmSetAsyncBio = await client.hmsetAsync("bio", flatBio);
  console.log(hmSetAsyncBio);

  const incrAge = await client.hincrbyAsync("bio", "age", 1);
  console.log(incrAge);

  const flatBioFromRedis = await client.hgetallAsync("bio");
  console.log(flatBioFromRedis);

  const remadeBio = unflatten(flatBioFromRedis);
  console.log(remadeBio);

  const jsonBio = JSON.stringify(bio);
  await client.setAsync("philJsonBio", jsonBio);

  const jsonBioFromRedis = await client.getAsync("philJsonBio");
  const recomposedBio = JSON.parse(jsonBioFromRedis);
  console.log(recomposedBio);
};

main();
