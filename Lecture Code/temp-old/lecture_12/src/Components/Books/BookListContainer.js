import React, { Component } from "react";
import { getLocalBooks } from "../../../data/books";
import BookList from "./BookList";

class BookListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: undefined
    };
  }

  async componentDidMount() {
    try {
      const bookList = await getLocalBooks();
      console.log(bookList);
      this.setState({ bookList });
    } catch (e) {
      console.log(e);
    }
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    if (this.state.bookList === undefined) return <div>Loading...</div>;

    return <BookList books={this.state.bookList} />;
  }
}

export default BookListContainer;
