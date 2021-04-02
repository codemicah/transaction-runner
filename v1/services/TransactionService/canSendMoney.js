const { conn } = require("../../config/database");
const { ApiError } = require("../../utils/apiError");

exports.CanSendMoney = async (user_ref, amount) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM balances WHERE user_ref = ${user_ref}`,
      (error, result) => {
        if (error) reject(new ApiError(error.message, 500));
        if (result.rows[0].amount < amount) resolve(false);
        else resolve(true);
      }
    );
  });
};
