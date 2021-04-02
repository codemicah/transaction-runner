const router = require("express").Router();
const {
  getUserProfile,
  deleteUser,
} = require("../controllers/user_controller");

const { auth } = require("../auth/auth");

router.use("/", auth);

router.get("/profile", getUserProfile);

// delete user account
router.delete("/", deleteUser);

module.exports = router;
