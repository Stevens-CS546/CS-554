const TOKEN_KEY = "books_api_token";

export const getToken = () => {
  return localStorage[TOKEN_KEY] || "";
};

export const setToken = token => {
  return (localStorage[TOKEN_KEY] = token);
};
