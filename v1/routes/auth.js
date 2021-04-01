const router = require("express").Router();
const {
  signup,
  login,
  validateBody,
} = require("../controllers/auth_controller");
const { validate } = require("../utils/requestValidator");

router.post("/signup", validateBody("signup"), validate, signup);

router.post("/login", validateBody("login"), validate, login);

module.exports = router;
