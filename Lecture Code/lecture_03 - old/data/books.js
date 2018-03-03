// const Gutenberg = require('gutenberg');
// const instance = new Gutenberg();

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

let exportedMethods = {
  getLocalBooks() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  getBook(id) {
    const bookPath = path.resolve(__dirname, "book-files/", `${id}.html`);

    return fs.statAsync(bookPath).then(stats => {
      return fs.readFileAsync(bookPath, "utf-8");
    });
  }
};

module.exports = exportedMethods;
