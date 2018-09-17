// const Gutenberg = require('gutenberg');
// const instance = new Gutenberg();

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

const books = [
  {
    id: 1080,
    title: "A Modest Proposal",
    author: "Jonathon Swift",
    nextBook: 132
  },
  { id: 132, title: "The Art of War", author: "Sun Tzu", nextBook: 135 },
  { id: 135, title: "Les Misérables", author: "Victor Hugo", nextBook: 16 },
  { id: 16, title: "Peter Pan", author: "James Matthew Barrie", nextBook: 829 },
  {
    id: 829,
    title: "Gulliver's Travels",
    author: "Jonathon Swift",
    nextBook: 1080
  }
];

let exportedMethods = {
  getLocalBooks() {
    return new Promise((resolve, reject) => {
      resolve(books);
    });
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  getBook: async id => {
    const bookPath = path.resolve(__dirname, "book-files/", `${id}.html`);

    await fs.statAsync(bookPath);
    const bookText = await fs.readFileAsync(bookPath, "utf-8");
    const matchingBook = books.filter(x => x.id === id)[0];
    const bookData = Object.assign({}, matchingBook);
    bookData.bookText = bookText;

    return bookData;
  }
};

module.exports = exportedMethods;
