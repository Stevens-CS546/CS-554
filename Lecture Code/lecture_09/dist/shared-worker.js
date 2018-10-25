const portList = [];

onconnect = function(e) {
  const port = e.ports[0];
  portList.push(port);

  port.onmessage = function(e) {
    const message = e.data.message;

    portList.forEach(thePort => {
      thePort.postMessage({ message: message });
    });
    //    port.postMessage({ message: message });
  };
};
