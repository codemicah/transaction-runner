const bycrypt = require("bcryptjs");
const { conn } = require("../../config/database");
const { GenToken } = require("./genToken");
const { UserExists } = require("../UserService/userExists");
const { ApiError } = require("../../utils/apiError");

exports.SignUp = async (data = {}) => {
  data.password = await bycrypt.hash(data.password, 10);

  const { firstname, lastname, email, password } = data;

  return new Promise(async (resolve, reject) => {
    const query =
      "INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *";

    const values = [firstname, lastname, email, password];

    conn.query(query, values, async (error, result) => {
      if (error) {
        reject(new ApiError(error.message, 500));
      } else {
        try {
          // create a balance for the user;
          await createBalance(result.rows[0].id);

          const token = await GenToken({ email, id: result.rows[0].id });
          resolve({ firstname, lastname, email, token });
        } catch (error) {
          reject(new ApiError(error.message, 500));
        }
      }
    });
  });
};

const createBalance = async (user_ref) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO balances(amount, user_ref) VALUES($1, $2)`;

    const values = ["0.00", user_ref];

    conn.query(query, values, (error) => {
      if (error) reject(new ApiError(error.message, 500));
      resolve(true);
    });
  });
};
