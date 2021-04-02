const { GetUserProfile, DeleteUser } = require("../services/UserService");
const { ErrorResponse, SuccessResponse } = require("../utils/apiResponse");

exports.getUserProfile = async (req, res) => {
  try {
    const user_id = req.user.id;

    const response = await GetUserProfile(user_id);

    return SuccessResponse(res, "Operation successful", 201, response);
  } catch (error) {
    return ErrorResponse(res, error.message, error.code, error.toString());
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user_id = req.user.id;

    const response = await DeleteUser(user_id);

    return SuccessResponse(res, "Operation successful", 201, response);
  } catch (error) {
    return ErrorResponse(res, error.message, error.code, error.toString());
  }
};
