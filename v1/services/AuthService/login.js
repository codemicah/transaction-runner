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
            if (await bycrypt.compare(password, result[0].password)) {
              delete result[0].password;

              result[0].token = await GenToken({
                email: result[0].email,
                id: result[0].id,
              });

              resolve(result[0]);
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
