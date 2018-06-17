# Welcome to the Lecture 5!

## Introduction

This week, we will continue discussing the nuances of component based development with React; this time, we will entire the territory of a single-page application!

## Running the Lecture Code

1.  [Clone code](https://github.com/Stevens-CS554/superheroes)
2.  Run `npm install`
3.  Run `npm start` to run the webpack development server
4.  Enjoy programming!

## What is a SPA?

A Single Page Application (SPA) is an application that only has one actual application entry point; this is, traditionally, an index.html file. All URLs for that application actually serve the index.html file. When the entry point is loaded, it loads a large amount of JavaScript that allows it to maintain the illusion of being a multi-page application.

### Splitting your view from your data layer

Single Page Applications generally require a set of routes related to static assets (the SPA) and a set of routes (often hosted on an entirely different server) that act as an API for the application's data. You can view your API as an extension of your data module layer.

Your SPA will make _many_ AJAX calls in order to get all the data required to run the application, and will make many AJAX calls to interact with the application.

## Developing a SPA

Developing a single-page application has transitioned into a perfectly normal strategy for web applications in modern web development, and has arguably become easier than developing a UI without using a SPA framework.

In this course, we will be using a series of JavaScript libraries from the React ecosystem:

1.  React; to render views
2.  React Router; a library to handle URL based routing
3.  Axios, an AJAX library
4.  Redux; a state manager for JavaScript
5.  Redux-saga; a state manager middleware that allows us to easily setup sequences of asynchronous operations.

These libraries, when working together, allow us to make a very fleshed out JavaScript application.

### create-react-app

In order to easily setup a development server with Webpack, Babel, and other build tests, we use a tool called `create-react-app` to easily initialize a Single Page Application. [This tool](https://github.com/facebook/create-react-app) will simplify much of the previously confusing steps regarding setting up a React environment.

### URL Based Routing with React Router

We will be utilizing [react-router](https://github.com/ReactTraining/react-router) to handle URLs in our application.

There are a few steps to setting up URL routing, and they start at the top-level of our application. [In our App.js](https://github.com/Stevens-CS554/superheroes/blob/master/src/App.js) file, you'll see that we're really simply making a component that returns a `Router` component. This Router enables listening for URL changes in that portion of the component tree.

Inside that Router, we see our first `Route` component. `Route` components have a path, which can have URL params, and a `component` property that dictates what component to render.

In this file, we see that when we match _any_ url starting with `/` (in effect, any URL) then we load up our `Site` component.

Our [Site component](https://github.com/Stevens-CS554/superheroes/blob/master/src/Site.js) is a little more complicated; this component has a `<Switch>` component. A URL can actually match many different routes, and you can match routes on multiple parts of your page. We use the `Switch` component to state that we only want to render out the _first_ matching `Route` component inside the Switch component.

### CORS

When we use two different domains for our products, our browsers offer us a great deal of protection. When on domain X, it will not perform an AJAX request to domain Y unless domain Y is setup to allow this request. This concept is called `Cross-Origin Resource Sharing` (CORS).

When it comes to matching domains, every part of the domain matters, including the port. When using two servers locally, [you will have to make sure the API server allows CORS to complete](https://github.com/Stevens-CS546/CS-554/blob/master/Lecture%20Code/lecture_10/app.js). A middleware to do that is provided in the lecture 10 codebase.

### Axios

We use the library [Axios](https://github.com/axios/axios) in order to easily make our AJAX requests, and receive promises instead of old style callbacks. Axios has a number of benefits -- the most major of which is the ability to add **interceptors** (think, middlewares) on both the request and response processing.

In order to make sure that we add an API key to each request we send to the superhero API, for example, [we make a single axios instance that the entire app uses](https://github.com/Stevens-CS554/superheroes/blob/master/src/utility/marvelApi.js). This allows us to setup an interceptor that fires off on each request and add our API key to the request.

### Authentication

Single Page Applications get loaded once, and then have to handle authentication on each request there-after since the initial request can either require no authentication or a user's authentication can expire after the app loads.

The easiest way to handle this is to develop a quick token-based authentication solution for your API. When a user's token is invalid (doesn't exist, expired, etc) then you would issue a 401 status code and fail the request.

In your axios instance, youw ould listen for 401 failures; when they occur, you would inform the user that there was an error and that they must login again.

Your SPA would retrieve the token during the login process; this login process would now be to send a username / password to the server, and receive a token in response. This token would then be stored in `localStorage` for later use.

### Distributing and deploying the application

Distributing and deploying the application is done easily by running `npm run build` in a create-react-app generated project. This will output the results to a `dist` folder, which you can then upload to your server.
