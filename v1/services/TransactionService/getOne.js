const { conn } = require("../../config/database");

exports.GetOneTransaction = async (user_id, transaction_id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM transactions WHERE user_ref = ${user_id} AND id = ${transaction_id}`,
      (error, result) => {
        if (error) reject(error);
        resolve(result.rows[0]);
      }
    );
  });
};
