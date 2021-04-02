const { conn } = require("../../config/database");
const { ApiError } = require("../../utils/apiError");

exports.DeleteUser = async (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE TABLE users SET is_deleted = true WHERE id = ${user_id} RETURNING *`;
    conn.query(query, (error, result) => {
      if (error) reject(new ApiError(error.message, 500));
      resolve(result.rows[0]);
    });
  });
};
