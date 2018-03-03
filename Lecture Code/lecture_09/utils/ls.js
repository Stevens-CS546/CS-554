const spawn = require("child_process").spawn;
function uint8arrayToStringMethod(myUint8Arr) {
  return String.fromCharCode.apply(null, myUint8Arr);
}

/**
 * crops and resizes images to our desired size
 * @param {Stream} streamIn in stream containing the raw image
 * @return {Stream}
 */
exports.listDirectory = filePath => {
  return new Promise((resolver, rejector) => {
    const command = "ls";
    const args = ["-la", filePath];

    const proc = spawn(command, args);

    let gatheredByteArray = new Uint8Array(0);

    proc.stderr.on("data", chunk => {
      // stream.emit("error", chunk);
    });

    proc.stdout.on("data", chunk => {
      const newByteArray = new Uint8Array(
        gatheredByteArray.length + chunk.length
      );

      newByteArray.set(gatheredByteArray);
      newByteArray.set(chunk, gatheredByteArray.length);
      gatheredByteArray = newByteArray;
      //stream.emit("data", chunk);
    });

    proc.stdout.on("end", chunk => {
      const body = uint8arrayToStringMethod(gatheredByteArray);

      resolver(body);
    });

    proc.on("error", chunk => {
      // stream.emit("error", chunk);
    });
  });

  return stream;
};
