const msql = require("mysql");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

let connection = msql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});
connection.connect((error) => {
  if (error) throw new Error(error);
  console.log("database connection successful");
});

module.exports = connection;
