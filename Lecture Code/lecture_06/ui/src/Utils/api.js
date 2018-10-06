import "whatwg-fetch";
import { getToken } from "./token";

// helper function to build the headers object for making requests to the API using fetch
function getHeaders(token, contentType = "application/json") {
  let headers = new Headers({ "Content-Type": contentType });

  if (token !== "undefined") {
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (contentType === null) {
    headers.delete("Content-Type");
  }

  return headers;
}

// when we get response from the server, we have to get the results in JSON from the readable stream that the fetch API returns.
// this is boilerplate code we dont need in each api call.
function processResponse(response) {
  let contentType = response.headers.get("content-type");
  // console.log(contentType);
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(json) {
      return json;
    });
  } else if (response.status === 204) {
    // 204 is "success with no content returned"
    // used during deletions
    return Promise.resolve("");
  } else {
    throw new Error("bad response...");
  }
}

// our only exportable function will marshall any requests to send data to or get data from the
// api. if no method is defined we assume a GET and if authentication isn't supplied it defaults to not
// sending the auth token, which is bad if the auth token is required...
export const processRequest = function(
  uri,
  method = "GET",
  data,
  authenticated = false
) {
  // create headers for request
  const token = authenticated ? getToken() : undefined;
  let headers = undefined;
  if (authenticated && !token) {
    // if there is no token, rejection
    return Promise.reject(new Error("No auth token found."));
  }

  // if there is form data, we will use the defaul application/json content type,
  // if there is no form data, don't define content type
  if (typeof data.formData !== "undefined") {
    headers = getHeaders(token, null);
  } else {
    headers = getHeaders(token);
  }

  // built the URL for the request object
  let url = uri;
  if (typeof data.query !== "undefined") {
    const queryArray = [];
    Object.keys(data.query).forEach(key =>
      queryArray.push(`${key}=${encodeURIComponent(data.query[key])}`)
    );
    if (queryArray.length > 0) {
      url = `${url}?${queryArray.join("&")}`;
    }
  }

  const request = {
    headers,
    method
  };

  // build any data to be send with the request
  const { body } = data; // if there is a body
  if (typeof body !== "undefined") {
    request.body = JSON.stringify(body);
  }

  const { formData } = data;
  if (typeof formData !== "undefined") {
    request.body = formData;
  }

  return fetch(url, request).then(function(response) {
    return processResponse(response);
  });
};
