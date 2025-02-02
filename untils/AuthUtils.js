const jwt = require("jsonwebtoken");
const User = require("../moudle/UserModel");

const isValidToken = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET_OR_KEY);
    return true;
  } catch (error) {
    // error
    return false;
  }
};

/**
 * retrieve token from header
 * @param {*} headers
 * @return {string} token or null
 */
const retrieveToken = (headers) => {
  if (headers && headers.authorization) {
    const tokens = headers.authorization.split(" ");
    if (tokens && tokens.length === 2) {
      return tokens[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const AuthUtils = {
  isValidToken,
  retrieveToken,
};

module.exports = AuthUtils;
