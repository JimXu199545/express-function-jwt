const User = require("../moudle/UserModel");

/**
 * Check for required params
 * @param {*} request
 * @return {boolean}
 */
const isValidUser = (request) => {
  if (request) {
    const email = request.body.email || "";
    const username = request.body.username || "";
    const password = request.body.password || "";
    const firstName = request.body.firstName || "";
    const lastName = request.body.lastName || "";
    if (email && username && password && firstName && lastName) {
      return true;
    }
  }
  return false;
};

/**
 * Retrieve user from request
 * @param {*} request
 * @return {object} user or null
 */
const userFromRequest = (request) => {
  if (isValidUser(request)) {
    return new User(request.body);
  }
  return null;
};

const UserUntils = {
  userFromRequest,
  isValidUser,
};

module.exports = UserUntils;
