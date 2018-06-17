# Welcome to the Lecture 3!

## Introduction

This week, we will cover component based web development with React.

## Running the Lecture Code

1.  Clone code
2.  Run `npm install`
3.  Run `npm start` to run the server _and_ set gulp to watch
4.  Enjoy programming!

## React

React is a library used for building user interfaces in JavaScript. It's an incredibly powerful component based framework.

There is one phrase to constantly keep in mind while developing in React: **Your view is a result of your properties and state.**

### JSX

React is written in JSX, an XML-Like syntax thats's written in JavaScript. While writing JSX files, you are still writing entirely JavaScript -- like SASS and ES6, it gets transpiled down to normal JavaScript.

### Babel

Babel is a library that parses a JavaScript file into an abstract syntax tree, and then convert it to output normal JavaScript. For example, in JSX:

    <div>
        <h1>Test</h1>
    </div>

Becomes:

    React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            "Test"
        )
    );

Babel also converts things like `async / await` in your frontend codebase down to 'normal' JavaScript that older browsers can understand.

# Basic React Concepts

## Components

Components are generally categorized as `container components`, which act as components that perform "app logic" such as querying data and submitting data to servers. Other components are `display components`, which just take in data and make a view out of them.

Some components are `stateful`, which means they have a state that gets manipulated over time. Others are `stateless`, which means they don't change over time besides when their properies change.

Some components are `stateless functional components` which don't use class notation, but have no `state` and instead are so slim that they are expressed as functions that return JSX. An example is [the recipe component](https://github.com/Stevens-CS546/CS-554/blob/master/Lecture%20Code/lecture_03/app_source/components/recipe.js).

# Codebase

We've got two repositories to look at this week:

## Recipe List (Basic Demo)

[The application source](https://github.com/Stevens-CS546/CS-554/tree/master/Lecture%20Code/lecture_03/app_source) of the recipe list is an oversimplified example. The lecture slides go into details of many of the individual files

### Files of note

**Note: all these start in the `/app_source/components/` folder.**

| src                       | notes                                                                                                                                                                                                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/app.js`                 | This file is a container that blocks off the layout into seperate main areas of the application                                                                                                                                                                                   |
| `/recipe_container.js`    | This file contains some class level logic for how recipes behave; it's a class that does three things: sets up an initial state where there are no recipes, queries a server for recipes when the component is attached to the page, and then uses that data for other components |
| `/recipes/recipe-list.js` | This file takes in a list of recipes as properties and renders them                                                                                                                                                                                                               |

Those patterns hold up for the comment sections as well.

## Superhero Listing (Multi-week Demo)

[This demo on marvel superheroes](https://github.com/Stevens-CS554/superheroes) will be covered across the next few weeks. This week, we'll focus on just the structure of a `create-react-app`.

### create-react-app

`create-react-app` is a [command line tool](https://github.com/facebook/create-react-app) that easily sets up a node package that acts as a single page web application with React.

We'll focus on a few simple things this week:

* Webpack and import statements
* The webpack dev server
* General structure

### webpack and import statements

Webpack is a module bundler for JavaScript. It's much more complete than a Gulp solution, where it will build out an entire frontend application including the HTML that the pages are mounted to.

Webpack is pointed at a single file (usually an index.js) file, and it looks for `import`statements in that file. It opens each file imported, and each file they import, and so on -- it builds a dependency tree. It constantly rebuilds the output as changes are made.

### webpack-dev-server

The superhero app server comes bundled with a `webpack-dev-server` that runs when the app start, a development server that runs that reloads the app as changes are made.

### General Structure

| path            | explanation                                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `/src`          | The source directory of the single page JavaScript app                                                                            |
| `/src/index.js` | This file simply imports the main React app, and mounts it to the main page                                                       |
| `/src/App.js`   | This is our first React component here; it's simply a container to start the main layout. It uses a router, which we'll see later |
| `/src/Site.js`  | The site file maintains some "state" for the app, which is the application state at a point in time                               |

---

We'll focus on this repository more next week!
