const express = require("express");

const v1 = express();

v1.use(express.json());

const authRoutes = require("./routes/auth");

v1.use("/auth", authRoutes);

module.exports = v1;
