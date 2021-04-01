const { conn } = require("../../config/database");

exports.CanSendMoney = async (user_ref, amount) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM balances WHERE user_ref = ${user_ref}`,
      (error, result) => {
        if (error) reject(error);
        if (result[0].amount < amount) resolve(false);
        else resolve(true);
      }
    );
  });
};
