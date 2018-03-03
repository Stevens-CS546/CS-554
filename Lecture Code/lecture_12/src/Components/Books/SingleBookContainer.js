import React, { Component } from "react";
import { getBook } from "../../../data/books";
import SingleBook from "./SingleBook";
import { clipboard } from "electron";

class SingleBookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: undefined,
      bookBlobUrl: undefined
    };
  }

  copyTextOfBook(book) {
    console.log(book);
    if (!book || !book.bookText) {
      return;
    }

    const bookText = book.bookText;
    clipboard.writeText(bookText);
  }

  setStateFromBook(book) {
    const blob = new Blob([book.bookText], { type: "text/html" });
    const bookBlobUrl = window.URL.createObjectURL(blob);

    this.setState({ book, bookBlobUrl });
  }

  async componentDidMount() {
    const bookId = parseInt(this.props.match.params.id, 10);
    const book = await getBook(bookId);
    this.setStateFromBook(book);
  }

  async componentWillReceiveProps(nextProps) {
    const bookId = parseInt(nextProps.match.params.id, 10);
    const book = await getBook(bookId);
    this.setStateFromBook(book);
  }

  render() {
    if (this.state.book === undefined) return <div>Loading...</div>;

    return (
      <SingleBook
        copyBookText={this.copyTextOfBook}
        book={this.state.book}
        contentUrl={this.state.bookBlobUrl}
      />
    );
  }
}

export default SingleBookContainer;
