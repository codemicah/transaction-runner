const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conn = require("../../config/database");
const { ApiError } = require("../../utils/apiError");

exports.Login = async (email, password) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      async (error, result) => {
        if (error) {
          reject(error.message, 404);
        } else {
          if (await bycrypt.compare(password, result[0].password))
            resolve(result);
          reject(new ApiError("Invalid Credentials"));
        }
      }
    );
  });
};
