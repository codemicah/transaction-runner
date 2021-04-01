const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);

module.exports = app;
