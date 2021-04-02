const { response } = require("express");
const express = require("express");

const v1 = express();

v1.use(express.json());

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transaction");
const userRoutes = require("./routes/user");

v1.use("/auth", authRoutes);
v1.use("/transactions", transactionRoutes);
v1.use("/users", userRoutes);

// api root route
v1.get("/", (req, res) => {
  return res.send(`
  <h1>Transaction Runner API v1</h1>
  <p>View  <a href="https://github.com/codemicah/transaction-runner#transaction-runner">documentation</a></p>
  `);
});

module.exports = v1;
