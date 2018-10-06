import React from "react";
import { Switch, Route } from "react-router-dom";
import BookListContainer from "./BookListContainer";
import SingleBookContainer from "./SingleBookContainer";

export const Books = match => {
  return (
    <Switch>
      <Route exact path="/books" component={BookListContainer} />
      <Route path="/books/:id" component={SingleBookContainer} />
    </Switch>
  );
};
