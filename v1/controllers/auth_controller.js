const { body } = require("express-validator");
const { SignUp, Login } = require("../services/AuthService");
const { UserExists } = require("../services/UserService");
const { ErrorResponse, SuccessResponse } = require("../utils/apiResponse");

exports.validateBody = (method) => {
  switch (method) {
    case "login":
      return [body("email").isEmail(), body("password").isString()];
    case "signup":
      return [
        body("email").isEmail(),
        body(["firstname", "lastname", "password"]).isString(),
      ];
  }
};

exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const data = {
      firstname,
      lastname,
      email,
      password,
    };

    if (await UserExists(email))
      return ErrorResponse(
        res,
        "User already exists",
        409,
        "A user with this email address is already registered"
      );

    const response = await SignUp(data);

    return SuccessResponse(res, "Operation successful", 201, response);
  } catch (error) {
    return ErrorResponse(res, error.message, error.code, error.toString());
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await Login(email, password);
    return SuccessResponse(res, "Operation successful", 200, response);
  } catch (error) {
    return ErrorResponse(res, error.message, error.code, error.toString());
  }
};
