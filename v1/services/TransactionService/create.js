const { conn } = require("../../config/database");
const { ApiError } = require("../../utils/apiError");

exports.CreateTransaction = async (data = {}) => {
  const { type, amount, user_ref } = data;

  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO transactions(amount, user_ref, type) VALUES($1, $2, $3) RETURNING *`;

    conn.query(query, [`${amount}`, user_ref, type], async (error, result) => {
      if (error) {
        reject(new ApiError(error.message, 500));
      }

      // update user's account balance
      const balance = await updateBalance(type, amount, user_ref);

      // update the transaction status after balance is updated
      const newTransaction = await updateTransactionStatus(
        result.rows[0].id,
        "complete"
      );

      resolve({ transaction: newTransaction, balance });
    });
  });
};

// function to update user's account balance
const updateBalance = async (type, amount, user_ref) => {
  let value = 0;

  const balance = await new Promise((resolve, reject) => {
    const query = `SELECT * FROM balances WHERE user_ref = ${user_ref}`;

    conn.query(query, (error, result) => {
      if (error) reject(new ApiError(error.message, 500));
      resolve(result.rows[0]);
    });
  });

  // update value based on transaction type
  if (type === "transfer") {
    value = Number(balance.amount) - Number(amount);
  } else if (type === "deposit") {
    value = Number(balance.amount) + Number(amount);
  }

  let query = `UPDATE balances SET amount = ${value} WHERE user_ref = ${user_ref} RETURNING *`;
  return new Promise((resolve, reject) => {
    conn.query(query, (error, result) => {
      if (error) reject(new ApiError(error.message, 500));
      resolve(result.rows[0].amount);
    });
  });
};

// function to update transaction status
const updateTransactionStatus = async (transaction_id, status) => {
  const query = `UPDATE transactions SET status = '${status}' WHERE id = ${transaction_id} RETURNING *`;

  return new Promise((resolve, reject) => {
    conn.query(query, (error, result) => {
      if (error) reject(new ApiError(error.message, 500));
      resolve(result.rows[0]);
    });
  });
};
