const spawn = require("child_process").spawn;
const Stream = require("stream");

/**
 * crops and resizes images to our desired size
 * @param {Stream} streamIn in stream containing the raw image
 * @return {Stream}
 */
exports.makeThumbnail = streamIn => {
  const command = "convert";

  const args = [
    "-", // use stdin
    "-gravity",
    "center", // sets the offset to the center
    "-extent",
    "500x500", // crop
    "-background",
    "white", // set a white background for the centered image
    "+repage", // reset the virtual canvas meta-data from the images.
    "png:-" // output to stdout as a png
  ];

  const proc = spawn(command, args);

  const stream = new Stream();

  proc.stderr.on("data", chunk => {
    stream.emit("error", chunk);
  });

  proc.stdout.on("data", chunk => {
    stream.emit("data", chunk);
  });

  proc.stdout.on("end", chunk => {
    stream.emit("end", chunk);
  });

  proc.on("error", chunk => {
    stream.emit("error", chunk);
  });

  streamIn.pipe(proc.stdin);

  return stream;
};
