# Welcome to the first week!

## Introduction

In this course, you will be taken through learning many advanced techniques and technologies that will help you act as a technology leader. The end goal is to equip you to work in a distributed environment, where all parts of your application are decentralized and can be scaled out easily.

The _Course Introduction_ PDF gives more details on how we will approach this.

In many weeks, we will also have "industry topics" which focus on a particular strategy, technique, or tool.

## Course Format

We will be hosting this course online only. As such, we will us a combination of weekly discussion threads, online hosted code, and routine office hours (optional to attend) to learn the material.

**The primary source of material is the codebase, the lecture slides, and the discussion thread**.

There are (almost) weekly assignments that cover the topic of the week; some assignments are given over the course of two weeks.

There will be some reading for this course; I will often point you to documentation pages for you to scan through to find relevant information related to the material or assignments.

## Grading

### Grade Breakdown

| Material                          | Percent | Comments                                                                                                                                                       |
| --------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Assignments                       | 50%     | Assignments will be weighted equally. They will be given most weeks and cover the content learned that week; there will be between 7 and 10 assignments        |
| Final Project Implementation Plan | 5%      | Students will form groups and propose a final project idea, and what technologies they will implement in it.                                                   |
| Database Proposal                 | 5%      | Each group will submit a proposal for their database collections and schema                                                                                    |
| Final Project Result & Code       | 45%     | Each group will submit their project code, a readme, and a database dump to be reviewed and graded based on what was promised in their proposal and delivered. |

### Other Notes

Late assignments are graded with a **_15 point penalty per day_**. Furthermore, **_failure to submit a portion of the final project on time will result in an automatic 0 for that portion of the project_**.

Obviously, "life happens"; if you require additional time to complete an assignment or a life situation happens, let me know and I will consider an extension. The more time in advance you let me know about your extension request, the more likely I am to grant the extension.

### Assignment Instructions Are Very Explicit

Your assignments come with very explicit instructions. Things that may seem trivial to you (wording in print statements, for example) are most definitely important to the grading drivers that assist in generating your grades. If you have any questions about ambiguous instructions, please post in the discussion thread and I will clarify it and re-adjust the assignment to clarify those instructions for all students.

### Misc.

If you are having a group issue during the final project period, you must reach out to me as soon as possible; it is much easier for everyone to resolve issues early and amicably than let them destroy a group as the deadline approaches.

### Getting the Code

In our "Syllabus & Welcome" section, you will find a link to our "Course Codebase"; we will be storing our code online for easy distribution.

This link takes you to the online version of our Git repository. You can learn more about Git using a [Git Tutorial](https://www.atlassian.com/git/tutorials) and an [interactive explanation of Git](https://try.github.io/).

This week, we'll learn more about updates to JavaScript (ES6) and recap the fundamentals of web development.

### Getting an IDE

In my heavily biased opinion, [Visual Studio Code](https://code.visualstudio.com/) is the best editor to use for this course due to its amazing [node debugger](https://code.visualstudio.com/docs/nodejs/nodejs-debugging); this allows you to step through your code line-by-line and watch the state of your variables.

## ES6 and Fundamentals of Web Development

The slides go into further information on many new ES6 topics. You will want to read through those slides and then refer back to this readme to see if there are any additional explanations.

### What is ES6?

ES6 is the most recent updated version of JavaScript. ES6 generally works very well in Node; the browsers are still catching up.

The only truly part of the slides is to understand how we can utilize `async` and `await` in ES6.

### async / await

Promises are often hard to handle, so we use the new ES6 keywords of `async` and `await` to hide promises.

You can mark a function as `async`, which will make the function automatically return a promise.

For example, the following method returns a value:

```javascript
function doubleUp(x) {
  return x * 2;
}
```

However, the following method returns a _promise that resolves to the value_:

```javascript
async function doubleUpAsync(x) {
  return x * 2;
}
```

Even though `doubleUpAsync` _appears_ to return a value, it actually returns a promise that resolves to `x * 2`.

By marking a function as `async`, we are able to use an extremely powerful keyword: the `await` keyword. It can only be used inside `async` functions.

```javascript
async function multipleByFourAsync(x) {
  const timesTwo = await doubleUpAsync(x);
  const timesFour = await doubleUpAsync(timesTwo);

  return timesFour;
}
```

The `await` keyword rewrites the method to actually use promises, while syntactically looking synchronously:

```javascript
function multipleByFourRewritten(x) {
  return doubleUpAsync(x)
    .then(timesTwo => {
      return doubleUpAsync(timesTwo);
    })
    .then(function(timesFour) {
      return timesFour;
    });
}
```

We much prefer the usage `async` / `await`.
