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

const initTables = () => {
  // create users table if it does not exist
  connection.query(
    `CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
        firstname TEXT NOT NULL, 
        lastname TEXT NOT NULL, 
        email TEXT NOT NULL, 
        password TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );

  // create transaction table if it does not exist
  connection.query(
    `CREATE TABLE IF NOT EXISTS transactions(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
        amount DECIMAL(10, 2) NOT NULL, 
        type ENUM('transfer', 'deposit'),
        status ENUM('complete', 'pending', 'failed') DEFAULT 'pending',
        user_ref INT,
        FOREIGN KEY (user_ref) REFERENCES users(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );

  // create balances table
  connection.query(
    `CREATE TABLE IF NOT EXISTS balances(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    user_ref INT,
    FOREIGN KEY (user_ref) REFERENCES users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
    (error) => {
      if (error) console.log(error);
    }
  );
};

initTables();

module.exports = { conn: connection, initTables };
