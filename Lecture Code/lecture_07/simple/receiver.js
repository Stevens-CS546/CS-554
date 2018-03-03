const redisConnection = require("./redis-connection");

redisConnection.on("send-message", (data, channel) => {
  let message = data.message;
  console.log("\n\n\n=================");
  console.log("We've received a message! It's:");
  console.log(message);
  console.log(JSON.stringify(data));
  console.log("=================\n\n\n");
});
