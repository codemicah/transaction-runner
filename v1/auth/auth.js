const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../utils/apiResponse");

const { SECRET } = process.env;

exports.auth = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token)
    return ErrorResponse(
      res,
      "Request not authenticated",
      401,
      "Token is required for authentication"
    );

  jwt.verify(token, SECRET, async (error, decoded) => {
    if (error)
      return ErrorResponse(
        res,
        "Request not authenticated",
        401,
        "Invalid token"
      );
    req.user = decoded;
    return next();
  });
};
