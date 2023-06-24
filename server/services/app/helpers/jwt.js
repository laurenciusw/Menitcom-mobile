const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const encodeToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const decodeToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  encodeToken,
  decodeToken,
};
