const dotenv = require("dotenv");
dotenv.config(); // Put 'At The Top' first to the environmental variable configuration.

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
