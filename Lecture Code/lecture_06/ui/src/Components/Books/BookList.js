import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ books }) => (
  <div>
    <h3>This is a list of books</h3>
    {books.map((book, index) => (
      <article key={index}>
        <header>
          <h4>
            <Link to={`/books/${book.id}`}>{book.title}</Link>
          </h4>
          <h5>{book.author}</h5>
        </header>
      </article>
    ))}
  </div>
);

export default BookList;
