const bycrypt = require("bcryptjs");
const { conn } = require("../../config/database");
const { ApiError } = require("../../utils/apiError");
const { GenToken } = require("./genToken");

exports.Login = async (email, password) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      async (error, result) => {
        if (error) {
          reject(error.message, 404);
        } else {
          try {
            if (await bycrypt.compare(password, result.rows[0].password)) {
              delete result.rows[0].password;

              result.rows[0].token = await GenToken({
                email: result.rows[0].email,
                id: result.rows[0].id,
              });

              resolve(result.rows[0]);
            }
            reject(new ApiError("Invalid Credentials", 400));
          } catch (error) {
            reject(error);
          }
        }
      }
    );
  });
};
