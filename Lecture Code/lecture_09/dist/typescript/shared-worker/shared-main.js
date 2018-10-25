/// <reference path ="../../../node_modules/@types/jquery/index.d.ts"/>
/// <reference path ="../../../node_modules/@types/sharedworker/index.d.ts"/>
(function() {
  var messageForm = $("#message-form");
  var messageInput = $("#message");
  var messageList = $("#message-list");
  var sharedWorker = new SharedWorker("/assets/shared-worker.js");
  messageForm.on("submit", function(e) {
    e.preventDefault();
    var message = messageInput.val();
    if (!message) return;
    sharedWorker.port.postMessage({ message: message });
  });
  sharedWorker.port.onmessage = function(message) {
    var messageData = message.data;
    var newMessage = $("<li>" + messageData.message + "</li>");
    messageList.append(newMessage);
  };
  sharedWorker.port.start();
})();
//# sourceMappingURL=shared-main.js.map
