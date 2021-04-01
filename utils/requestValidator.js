const { validationResult } = require("express-validator");
const { ErrorResponse } = require("../utils/apiResponse");

// middleware to validate request body
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  let extractedErrors = [];
  errors.array().forEach((e) => {
    extractedErrors.push(e);
  });

  return ErrorResponse(res, "Invalid request", 400, extractedErrors);
};
