# Welcome to the Lecture 8!

## Introduction

This week, things start forming very, very complicated applications.

## `index.js`

Most of our code this week is simply a demonstrating of how to use the commands
listed in the [redis command list](https://redis.io/commands). We're also making
sure to really drive home the usage of async / await.

Redis is a very, very simple to use technology -- the initial commands (get,
exists, set) are all very self explanatory.

Batching is an interesting concept, however -- it's the equivalent of queueing
up many different operations to send to the server.

The notation for batching comes in the form of a
[fluent interface](https://en.wikipedia.org/wiki/Fluent_interface):

```
  let batchResult = await client
    .multi()
    .set("favoriteDrink", "coffee")
    .set("favoriteFood", "steak")
    .set("cake", "is a lie")
    .execAsync();
```

As you'll see, once we do the call to `multi()` we start configuring an object
with a series of operations to send to the server -- none of these are sent
until we call `.execAsync()`.

This allows us to do things like generate series of queries based on in memory
data, like so:

```
const setOperations = [
    {key: "favoriteDrink", value: "coffee"},
    {key: "favoriteFood", value: "steak"},
    {key: "cake", value: "is a lie"},
];

let batchOperation = client.multi();

setOperations.forEach(op => {
    batchOperation = batchOperation.set(op.key, op.value);
});

const batchResult = await batchOperationexecAsync();
```

Multi gets work similarly, where we get multiple pieces of data with one
command.

The only "hard" thing to handle in redis is the storage of deeply nested objects
(particiularly ones with array-like data).

We can leverage Redis' native hash data structure to "group" data together, but
then deserializing arrays becomes difficult. As a result, some people prefer to
simply store JSON; others prefer to come up with their own notation, like adding
`[]` to key names, and adding a deserialization step to handle these sorts of
issues. Either way, a nicely written data module will help when handling data
stored in Redis.
