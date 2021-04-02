const { conn } = require("../../config/database");
const { ApiError } = require("../../utils/apiError");

exports.GetUserProfile = async (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE id = ${user_id} AND is_deleted = false`;
    conn.query(query, (error, result) => {
      if (error) reject(new ApiError(error.message, 500));

      delete result.rows[0].password;

      resolve(result.rows[0]);
    });
  });
};
