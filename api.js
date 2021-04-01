const express = require("express");

const api = express();

api.use(express.json());

const v1 = require("./v1");

api.use("/api/v1", v1);

module.exports = api;
