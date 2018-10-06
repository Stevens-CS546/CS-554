import React, { Component } from "react";
import { getBookList } from "../../Data/books";
import BookList from "./BookList";

class BookListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: undefined
    };
  }

  async componentDidMount() {
    const bookList = await getBookList();
    this.setState({ bookList });
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    if (this.state.bookList === undefined) return <div>Loading...</div>;

    return <BookList books={this.state.bookList} />;
  }
}

export default BookListContainer;
