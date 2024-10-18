const express = require("express");

require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();

const globalMiddleware = (req, res, next) => {
  console.log("working");
  next();
};

// middleware
app.use(globalMiddleware);

const middleware = (reg, res, next) => {
  res.send("hello express");
  next();
};

const middleware2 = (req, res, next) => {
  console.log("this is middleware #2");
  next();
};

const middleware3 = (req, res) => {
  console.log("this is middleware #3");
};

app.get("/", middleware, middleware2, middleware3);
app.get("/users/create", (req, res) => {
  res.send("create new user");
});
app.get("/users/:userId", (req, res) => {
  console.log(`This is my user ID ${req.params.userId}`);
});
app.get("/login", (req, res) => {
  res.send("this is login");
});

app.listen(PORT);
