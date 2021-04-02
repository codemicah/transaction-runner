const { conn } = require("../../config/database");
const { ApiError } = require("../../utils/apiError");

exports.UserExists = async (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT email FROM users WHERE email = '${email}' AND is_deleted = false`;
    conn.query(query, (error, result) => {
      if (error) reject(new ApiError(error.message, 500));
      if (result.rows.length) resolve(true);
      else resolve(false);
    });
  });
};
