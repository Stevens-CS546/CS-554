const redisConnection = require("./redis-connection");

redisConnection.emit("send-message", {
    message: "Hello, world!"
});
