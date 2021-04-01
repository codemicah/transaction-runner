const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conn = require("../../config/database");

const { SECRET } = process.env;

exports.SignUp = async (data = {}) => {
  await createTable();

  const { firstname, lastname, email, password } = data;

  data.password = await bycrypt.hash(data.password, 10);

  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO users(firstname, lastname, email, password) VALUES(?, ?, ?, ?)`,
      [firstname, lastname, email, password],
      (error) => {
        if (error) {
          reject(error);
        } else {
          const token = jwt.sign({ email }, SECRET, { expiresIn: 86400 });
          resolve({ firstname, lastname, email, token });
        }
      }
    );
  });
};

async function createTable() {
  // create users table if it does not exist
  return new Promise((resolve, reject) => {
    conn.query(
      `CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
        firstname TEXT NOT NULL, 
        lastname TEXT NOT NULL, 
        email TEXT NOT NULL, 
        password TEXT NOT NULL
        )`,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}
