const express = require("express");

const api = express();

api.use(express.json());

const v1 = require("./v1");

api.use("/api/v1", v1);

api.get("/", (req, res) => {
  return res.send(`
    <h1>Transaction Runner API</h1>
    <p>Go to <a href="/api/v1">v1</a></p>
    <p>View  <a href="https://github.com/codemicah/transaction-runner#transaction-runner">documentation</a></p>
    `);
});

module.exports = api;
