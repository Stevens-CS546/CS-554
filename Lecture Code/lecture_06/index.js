const bluebird = require("bluebird");
const NRP = require('node-redis-pubsub');
const flat = require("flat");
const unflatten = flat.unflatten
const config = {
    port: 6379, // Port of your locally running Redis server
    scope: 'recipes' // Use a scope to prevent two NRPs from sharing messages
};

const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let sayHello = client.setAsync("hello", "world");
sayHello.then(() => {
    return client.getAsync("hello");
}).then((hello) => {
    console.log(`hello, ${hello}`);
    return client.existsAsync("hello");
}).then((doesHelloExist) => {
    console.log(`doesHelloExist ? ${doesHelloExist === 1}`);
    return client.existsAsync("pikachu");
}).then((doesPikachuExist) => {
    console.log(`doesPikachuExist ? ${doesPikachuExist === 1}`);
    return client.setAsync("goodnight", "moon");
}).then((setResult) => {
    // batch operations transaction
    return client
        .multi()
        .set("favoriteDrink", "coffee")
        .set("favoriteFood", "steak")
        .set("cake", "is a lie")
        .execAsync();
}).then(() => {
    // not batched, just multiple getting
    return client.mgetAsync("favoriteDrink", "favoriteFood", "cake", "goodnight", "hello");
}).then((result) => {
    console.log(result);
    return client.delAsync("hello");
}).then(() => {
    return client.existsAsync("hello");
}).then((doesHelloExist) => {
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
        age: 23
    };

    let flatBio = flat(bio);
    return client.hmsetAsync("bio", flatBio)
}).then(() => {
    return client.hincrbyAsync("bio", "age", 1);
}).then(() => {
    return client.hgetallAsync("bio")
}).then((flatBio) => {
    // oh no, 24 is for some reason a string!
    return unflatten(flatBio)
}).then((bio) => {
    console.log(bio);
}).catch((e) => {
    console.log(e);
})