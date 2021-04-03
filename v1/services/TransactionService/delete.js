const { conn } = require("../../config/database");
const { ApiError } = require("../../utils/apiError");

exports.DeleteTransaction = async (user_id, transaction_id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM transactions WHERE user_ref = ${user_id} AND id = ${transaction_id}`;

    conn.query(query, (error, result) => {
      if (error) reject(new ApiError(error.message, 500));
      resolve(result.rows[0]);
    });
  });
};
