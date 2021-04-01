const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

exports.GenToken = async (payload = {}) => {
  return jwt.sign(payload, SECRET, { expiresIn: 86400 });
};
