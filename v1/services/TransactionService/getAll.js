const { conn } = require("../../config/database");

exports.GetAllTransactions = async (user_id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM transactions WHERE user_ref = ${user_id}`,
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
};
