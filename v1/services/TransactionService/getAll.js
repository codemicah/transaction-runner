const { conn } = require("../../config/database");

exports.GetAllTransactions = async (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM transactions WHERE user_ref = ${user_id}`;

    conn.query(query, (error, result) => {
      if (error) reject(error);
      resolve(result.rows);
    });
  });
};
