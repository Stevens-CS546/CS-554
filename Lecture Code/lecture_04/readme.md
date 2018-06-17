# Welcome to the Lecture 4!

## Introduction

This week, we will continue discussing the nuances of component based development with React.

## Running the Lecture Code

1.  [Clone code](https://github.com/Stevens-CS554/superheroes)
2.  Run `npm install`
3.  Run `npm start` to run the webpack development server
4.  Enjoy programming!

## The Virtual DOM

One of the most important concepts in React development is that it relies on a [Virtual DOM](https://reactjs.org/docs/faq-internals.html). The Virtual DOM is an in-memory representation of all your rendered components. The only time any of the _real_ DOM elements are manipulated on the page is when their _virtual_ DOM elements are updated. The only DOM elements updated are ones that have their virtual DOM counterparts updated, first.

## Properties and State

The data used to render a react component can only come from 2 places: properties (props), and state. There are fundamental differences of how and when we use one versus the other.

There is one phrase to constantly keep in mind while developing in React: **Your view is a result of your properties and state.**

### Properties

Properties can be seen as the the inputs for components. A component cannot manipulate its own properties, because those are inputs from its parent component. When a component's properties are updated, the component rerenders.

We can see properties all over -- we can see that the [SuperHeroListContainer](https://github.com/Stevens-CS554/superheroes/blob/master/src/SuperHeroListContainer.js) passes a property called `heroList` to the `SuperHeroList` component. The [SuperHeroList](https://github.com/Stevens-CS554/superheroes/blob/master/src/SuperHeroList.js) component uses this property via `this.props.heroList`. Similarly, we have a stateless functional component, [SuperHeroEntry](https://github.com/Stevens-CS554/superheroes/blob/master/src/SuperHeroEntry.js) that uses props by destructuring them from the function arguments.

### State

The state is the internal data that a component uses to decide what to render. You can view it as private variables. Each time the state is changed using the `setState` method, the component rerenders.

In our [SearchForm.js](https://github.com/Stevens-CS554/superheroes/blob/master/src/SearchForm.js) file, we set the internal state of the search form each time we change the search query using the `onSearchQueryChange` callback.

## JSX Syntax

JSX is an XML-Like syntax that gets compiled to plain old JavaScript. Since it is written in JavaScript, there are some syntactical factors you have to account for. There are also some best practices

### Setting CSS Classes

In JavaScript, the word `class` is a reserved keyword, so we use the `className` property on a JSX element in order to give it CSS classes.

For example, to give a `div` a class of `col-sm-12` we would use: `<div className="col-sm-12">`.

### onChange

Our [SearchForm](https://github.com/Stevens-CS554/superheroes/blob/master/src/SearchForm.js) uses the `onChange` property to update the state when the input changes.

```
<input
    type="text"
    value={this.state.searchQuery}
    onChange={this.onSearchQueryChange}
    className="form-control"
    id="superheroName"
    aria-describedby="superheroHelp"
    placeholder="Superhero..."
/>
```

Events in React generally come with a `target` property, pointing to their DOM element.

```
  onSearchQueryChange = e => {
    this.setState({
      searchQuery: e.target.value
    });
  };
```

We track the `onChange` event of that input, and then we set the state `searchQuery` property with the value from the input.

### htmlFor

Most languages have a `for` loop, meaning the `for` keyword is reserved. To give an element the `for` attribute we simply use `htmlFor`.

```
<label htmlFor="superheroName">
    What superhero do you want to search for?
</label>
```

### Controlled Inputs

One of the huge benefits of using React is to have a view that is entirely rendered from the component data, meaning that we can make sure that the UI rendered is always exactly as expected. The UI is _only_ composed from the data in the component.

Therefore, `input` elements pose a problem: their display comes from users manipulating the elements. We can circumvent this and control our inputs by manually setting the `value` property on the input, meaning it will always use a value from the state or property. Our input about is controled.

### onClick

You can run events when an element is clicked by hooking into the `onClick` property of an element.

## Component Life Cycle

Components emit a series of events depending on what changes a component is undergoing.

### constructor

A components constructor is called when the component is first initialized. This is where you would set a components initial state, and setup any other internal class variables required.

### componentDidMount

When a component is added to the component tree, its `componentDidMount` property is called. At this point, you would use the components properties to fetch data from an API endpoint on a server.

### componentDidUpdate / componentWillReceiveProps

When the `props` of a component change, the `componentDidUpdate` property is called; this used to be called `componentWillReceiveProps`. For example, if a superhero component needs to fetch data based on the `id` prop passed to the component, when that `id` changes, you would want to re-query the server for the new hero. You would perform this in the `componentDidUpdate` call.

### componentWillUnmount

When a component is removed from the component tree, the `componentWillUnmount` property is called. This can be very useful; for example, if you are making an email editor component, when the component unmounts you may want to save a draft.
