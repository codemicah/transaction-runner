const bycrypt = require("bcryptjs");
const { conn } = require("../../config/database");
const { GenToken } = require("./genToken");

exports.SignUp = async (data = {}) => {
  data.password = await bycrypt.hash(data.password, 10);

  const { firstname, lastname, email, password } = data;

  return new Promise((resolve, reject) => {
    conn.query(
      "INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *",
      [firstname, lastname, email, password],
      async (error, result) => {
        if (error) {
          reject(error);
        } else {
          try {
            // create a balance for the user;
            await createBalance(result.rows[0].id);

            const token = await GenToken({ email, id: result.rows[0].id });
            resolve({ firstname, lastname, email, token });
          } catch (error) {
            reject(error);
          }
        }
      }
    );
  });
};

const createBalance = async (user_ref) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO balances(amount, user_ref) VALUES($1, $2)`,
      ["0.00", user_ref],
      (error) => {
        if (error) reject(error);
        resolve(true);
      }
    );
  });
};
