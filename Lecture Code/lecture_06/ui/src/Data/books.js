import { processRequest } from "../Utils/api";
const baseUrl = "http://localhost:3001";

export const getBookList = () => {
  return processRequest(`${baseUrl}/books`, "GET", {}, false);
};

export const getBook = id => {
  if (!id)
    return Promise.reject(new Error("An ID is required to get a book by ID"));

  return processRequest(`${baseUrl}/books/${id}`, "GET", {}, false);
};
