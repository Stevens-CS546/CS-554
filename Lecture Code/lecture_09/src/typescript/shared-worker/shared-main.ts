/// <reference path ="../../../node_modules/@types/jquery/index.d.ts"/>
/// <reference path ="../../../node_modules/@types/sharedworker/index.d.ts"/>
interface IResponseMessageData {
  message: string;
}

(() => {
  const messageForm = $("#message-form");
  const messageInput = $("#message");
  const messageList = $("#message-list");

  const sharedWorker = new SharedWorker("/assets/shared-worker.js");

  messageForm.on("submit", function(e) {
    e.preventDefault();

    const message = messageInput.val();
    if (!message) return;
    sharedWorker.port.postMessage({ message: message });
  });

  sharedWorker.port.onmessage = message => {
    const messageData: IResponseMessageData = message.data;

    const newMessage = $(`<li>${messageData.message}</li>`);
    messageList.append(newMessage);
  };

  sharedWorker.port.start();
})();
