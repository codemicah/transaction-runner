const { body } = require("express-validator");
const {
  CreateTransaction,
  GetAllTransactions,
  CanSendMoney,
  GetOneTransaction,
} = require("../services/TransactionService");
const { ErrorResponse, SuccessResponse } = require("../utils/apiResponse");

exports.validateBody = (method) => {
  switch (method) {
    case "send":
      return [body("amount").isNumeric()];
  }
};

exports.sendMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    const user_ref = req.user.id;

    const data = {
      amount,
      user_ref,
      type: "transfer",
    };

    // check if user has enough balance to send money
    if (await CanSendMoney(user_ref, amount)) {
      const response = await CreateTransaction(data);
      return SuccessResponse(res, "Operation successful", 201, response);
    } else {
      return ErrorResponse(
        res,
        "Transaction declined",
        401,
        "Insufficient balance"
      );
    }
  } catch (error) {
    return ErrorResponse(res, error.message, error.code, error.toString());
  }
};

exports.addMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    const user_ref = req.user.id;

    const data = {
      amount,
      type: "deposit",
      user_ref,
    };
    const response = await CreateTransaction(data);

    return SuccessResponse(res, "Operation successful", 201, response);
  } catch (error) {
    return ErrorResponse(res, error.message, error.code, error.toString());
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const user_ref = req.user.id;

    const response = await GetAllTransactions(user_ref);

    return SuccessResponse(res, "Operation successful", 201, response);
  } catch (error) {
    return ErrorResponse(res, error.message, error.code, error.toString());
  }
};

exports.getOneTransaction = async (req, res) => {
  try {
    const user_ref = req.user.id;
    const { transaction_id } = req.params;

    const response = await GetOneTransaction(user_ref, transaction_id);

    return SuccessResponse(res, "Operation successful", 201, response);
  } catch (error) {
    return ErrorResponse(res, error.message, error.code, error.toString());
  }
};
