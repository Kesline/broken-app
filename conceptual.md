### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Some ways to manage asynchronous code in JavaScript include:

Callbacks: Functions passed as arguments to other functions to be called when an asynchronous operation completes.
Promises: Objects representing the eventual completion (or failure) of an asynchronous operation, providing then, catch, and finally methods for handling results.
Async/Await: Syntactic sugar built on promises, allowing asynchronous code to be written in a more synchronous, readable manner.
Event Loop: The mechanism that handles asynchronous callbacks in JavaScript, ensuring that non-blocking operations are processed efficiently.



- What is a Promise?
A Promise is an object that represents the eventual completion or failure of an asynchronous operation. It provides methods such as then, catch, and finally to handle the result (resolved value) or error (rejection reason). Promises help manage asynchronous operations more cleanly than traditional callback patterns.



- What are the differences between an async function and a regular function?

Async Functions:
Defined with the async keyword.
Can use the await keyword to pause execution until a Promise is resolved.
Always return a Promise.

Regular Functions:
Defined without the async keyword.
Cannot use the await keyword.
Return values directly, not wrapped in a Promise.


- What is the difference between Node.js and Express.js?

Node.js:

A runtime environment that allows JavaScript to run on the server side.
Provides core modules for file system access, networking, and other low-level operations.
Express.js:

A web application framework built on top of Node.js.
Simplifies the process of building web applications and APIs by providing higher-level abstractions for routing, middleware, and HTTP handling.

- What is the error-first callback pattern?
The error-first callback pattern is a convention for writing asynchronous functions in Node.js. In this pattern, the first argument of the callback is an error object (or null if no error occurred), followed by the results of the operation


- What is middleware?
Middleware is a function in Express.js that processes requests before they reach the final request handler. Middleware can modify the request and response objects, handle errors, or perform any necessary processing. Middleware functions can be stacked, allowing for modular and reusable code.


- What does the `next` function do?

The next function is used in Express.js middleware to pass control to the next middleware function in the stack. If not called, the request will not proceed to the next middleware or route handler. It is essential for chaining multiple middleware functions together.


- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
-Performance: The code makes three sequential API requests, waiting for each to complete before starting the next. This increases the total execution time.

-Order of Return Values: The return array has matt and joel swapped, which could be confusing and likely unintended.

-Error Handling: The code does not handle potential errors from the API requests.