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

const exportedMethods = {
  getLocalBooks() {
    return Promise.resolve().then(() => {
      return books;
    });
  },
  getBook(id) {
    return Promise.resolve()
      .then(() => {
        const bookPath = path.resolve(__dirname, "book-files/", `${id}.html`);
        return fs.statAsync(bookPath).then(() => {
          return fs.readFileAsync(bookPath, "utf-8");
        });
      })
      .then(bookText => {
        const matchingBook = books.filter(x => x.id === id)[0];
        const bookData = Object.assign({}, matchingBook);
        bookData.bookText = bookText;
        return bookData;
      });
  }
};

module.exports = exportedMethods;
