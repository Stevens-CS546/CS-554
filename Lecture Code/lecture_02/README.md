# Welcome to the Lecture 2!

## Introduction

This week, we will cover optimizaitons, something, and SASS.

Our real world case study this week will be searching large data sets using Tries!

## Optimizations

The Web is a complicated series of interactions, and each interaction comes at a cost. There are many optimizations we can easily make on our websites to make them easier to distribute.

### Declutter your head (tag)

Websites will only load a few external URLs per domain at a certain time, and the body of a page won't start rendering until all the assets in your head tag are downloaded, interpreted, and run. If we can make our head tags minimal, with few assets (and small ones!) we will be able to ensure a more rapid render.

### Minify, Uglify, Optimize your Code

We can dramatically reduce the amount of characters our code ships down to the user with. For example, in this simple CSS block:

```
.foo {
	color: #000;
	font-size: 12pt;
	font-weight: 700;
	border: 1px solid #EEE;
}

.bar {
	color: #000;
	font-size: 12pt;
	font-weight: 700;
	border: 1px solid #000;
}
```

We can condense that to:

```
.foo, .bar {
	color: #000;
	font-size: 12pt;
	font-weight: 700;
}

.foo {
	border: 1px solid #000;
}

.bar {
	border: 1px solid #EEE;
}
```

And then further to:

```
.bar,.foo{color:#000;font-size:12pt;font-weight:700}.foo{border:1px solid #000}.bar{border:1px solid #EEE}
```

The original string is `197` characters; the final string is `106`; imagine having 200 selectors to begin with instead of 2! During download, a user has to download `91` extra characters if you do not optimize it; scale that to 200 more rules, and we'll just ballpark it as `9100`, or `8.88671875KB`.

Usually, your savings will be even greater than that.

### Remove Dead Code / Reduce Overhead / Reduce Requests

Reducing the number of assets you use in general is an amazing optimization. Sometimes, it's more than worth it to replicate a tiny part of a library if you only need it for a handful of situations. That allows you to reduce bloat tremendously, and avoid another HTTP request to the server, which takes a considerable amount of time (relatively speaking, of course).

### Caching and CDNs

We can leverage caching and CDNS to ensure that we don't need to download files that we've already downloaded before.

### Compress Text with Gzip, Optimize Images

We can reduce file sizes dramatically by optimizing images or GZipping them, which is basically 0-effort to perform.

## Applying Optimizations via Gulp

We can apply many of these optimizations through various Gulp plugins or simply modifying our practices. [Gulp is a task runner](https://gulpjs.com/) that allows us to define and run particular tasks, which are chains of commands that fire off on a set of files.

For example, let's take a look at [our repository for this week](https://github.com/Stevens-CS546/CS-554/blob/master/Lecture%20Code/lecture_02/gulpfile.js). We register several tasks in this file:

* `sass`
* `js:vendor`
* `build`; this runs `sass` and `js:vendor`, as they are listed as dependencies
* `watch`
* `default`

The basic flow of a task is simple:

1.  Use `gulp.src` on a [glob](https://www.npmjs.com/package/globule) to make a stream representing the contents of each file matched by the glob
2.  Pipe the result of that stream to a new stream using `.pipe(OPERATION)`, where `OPERATION` is a task that returns a new stream with the new data
3.  Repeat pipe for each step
4.  Perform a `pipe` to `gulp.dest('path')` to save the result

There are many operations that we can perform that are listed in the lecture slides, and there are hundreds of gulp plugins available on NPM!

## SASS

### What is SASS?

[SASS is a more maintainable way of writing CSS](https://sass-lang.com/). It brings some programmability to CSS, such as the usage of variables and loops, and import statements, and a minor amount of inheritance / other OOP concepts.

The slides and documentation go over a number of functions that SASS provides.

### How do compile SASS?

For now, we will be using a plugin for gulp named `gulp-sass` to build our SASS files. An example of building SASS files is seen in [this week's repository](https://github.com/Stevens-CS546/CS-554/blob/master/Lecture%20Code/lecture_02/gulpfile.js).

## Assignment Help

* You will use the repository from this week but modify it slightly to theme your own bootstrap
* You should read [theming bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/theming) in order to get a guide, from the source, on how to properly import and override Bootstrap Variables. Essentially, you will make 1 file that imports Bootstrap's files, and overrides with your own variables to customize it slightly.
