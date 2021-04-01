const router = require("express").Router();
const {
  getAllTransactions,
  sendMoney,
  addMoney,
  validateBody,
} = require("../controllers/transaction_controller");
const { validate } = require("../utils/requestValidator");

const { auth } = require("../auth/auth");

router.use("/", auth);

router.post("/send", validateBody("send"), validate, sendMoney);

router.get("/", getAllTransactions);

router.post("/receive", validateBody("send"), addMoney);

module.exports = router;
