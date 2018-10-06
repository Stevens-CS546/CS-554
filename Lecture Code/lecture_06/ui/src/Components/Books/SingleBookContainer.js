import React, { Component } from "react";
import { getBook } from "../../Data/books";
import SingleBook from "./SingleBook";

class SingleBookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: undefined,
      bookBlobUrl: undefined
    };
  }

  setStateFromBook(book) {
    const blob = new Blob([book.bookText], { type: "text/html" });
    const bookBlobUrl = window.URL.createObjectURL(blob);

    this.setState({ book, bookBlobUrl });
  }

  async componentDidMount() {
    const book = await getBook(this.props.match.params.id);
    this.setStateFromBook(book);
  }

  async componentWillReceiveProps(nextProps) {
    const book = await getBook(nextProps.match.params.id);
    this.setStateFromBook(book);
  }

  render() {
    if (this.state.book === undefined) return <div>Loading...</div>;

    return (
      <SingleBook book={this.state.book} contentUrl={this.state.bookBlobUrl} />
    );
  }
}

export default SingleBookContainer;
