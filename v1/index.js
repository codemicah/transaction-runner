const { response } = require("express");
const express = require("express");

const v1 = express();

v1.use(express.json());

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transaction");

v1.use("/auth", authRoutes);
v1.use("/transactions", transactionRoutes);

v1.get("/", (req, res) => {
  return res.send("Transaction Runner API v1");
});

module.exports = v1;
