import "./SingleBook.css";
import React from "react";
import { Link } from "react-router-dom";

const SingleBook = ({ book, contentUrl }) => (
  <article>
    <h3>{book.title}</h3>
    <h4>By {book.author}</h4>
    <p>
      <small>
        Like this story?{" "}
        <Link to={`/books/${book.nextBook}`}>Read our next suggestion!</Link>
      </small>
    </p>
    <main>
      <iframe src={contentUrl} />
    </main>
  </article>
);

export default SingleBook;
