const redisConnection = require("./redis-connection");

redisConnection.on("send-message:request:*", (message, channel) => {
  let messageText = message.data.message;
  console.log("\n\n\n=================");
  console.log("We've received a message from the API server! It's:");
  console.log(messageText);
  console.log(JSON.stringify(message));
  console.log("=================\n\n\n");
});

redisConnection.on("send-message-with-reply:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let messageText = message.data.message;
  let successEvent = `${eventName}:success:${requestId}`;

  redisConnection.emit(successEvent, {
    requestId: requestId,
    data: {
      message: messageText,
      reversedMessage: messageText
        .split("")
        .reverse()
        .join("")
    },
    eventName: eventName
  });
});
