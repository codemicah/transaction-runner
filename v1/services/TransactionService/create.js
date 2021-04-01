const { conn } = require("../../config/database");

exports.CreateTransaction = async (data = {}) => {
  const { type, amount, user_ref } = data;

  return new Promise((resolve, reject) => {
    conn.query(
      `
    INSERT INTO transactions(amount, user_ref, type) VALUES(?, ?, ?)`,
      [amount, user_ref, type],
      async (error) => {
        if (error) {
          reject(error);
        }
        const balance = await updateBalance(type, amount, user_ref);
        resolve({ type, amount, balance });
      }
    );
  });
};

const updateBalance = async (type, amount, user_ref) => {
  let value = 0;

  const balance = await new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM balances WHERE user_ref = ${user_ref}`,
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });

  if (type === "transfer") {
    value = balance[0].amount - amount;
  } else if (type === "deposit") {
    value = balance[0].amount + amount;
  }

  let query = `UPDATE balances SET amount = ${value} WHERE user_ref = ${user_ref}`;
  return new Promise((resolve, reject) => {
    conn.query(query, (error) => {
      if (error) reject(error);
      resolve(value);
    });
  });
};
