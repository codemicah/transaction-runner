const router = require("express").Router();
const authController = require("../controllers/auth_controller");
const { validate } = require("../utils/requestValidator");

router.post(
  "/signup",
  authController.validateBody("signup"),
  validate,
  authController.signup
);

router.post(
  "/login",
  authController.validateBody("login"),
  validate,
  authController.login
);

module.exports = router;
