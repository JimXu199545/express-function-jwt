const UserUntils = require("../untils/UserUntils");
const User = require("../moudle/UserModel");
const jwt = require("jsonwebtoken");
const register = (request, response) => {
  if (UserUntils.isValidUser(request)) {
    // insert only if we have required data
    // we can find by username or email
    // because they are unique
    // insert only if user not exist
    const email = request.body.email || "";
    User.findOne({ email: email }, (error, user) => {
      // insert only if user not exist
      if (error) {
        response.status(500).send({
          success: false,
          message: error.message,
        });
      } else {
        if (!user) {
          const userModel = UserUntils.userFromRequest(request);
          userModel.save((error) => {
            if (error) {
              response.status(500).send({
                success: false,
                message: error.message,
              });
            } else {
              response.status(200).send({
                success: true,
                user: userModel,
              });
            }
          });
        } else {
          response.status(400).send({
            success: false,
            message: "The user exists",
          });
        }
      }
    });
  } else {
    response.status(400).send({
      success: false,
      message: "The user is not valid",
    });
  }
};

/**
 * User login
 * @param {*} request
 * @param {*} response
 * @return {*} logged existant user or error
 */
const login = async (request, response) => {
  const email = request.body.email || "";
  const password = request.body.password || "";
  if (email && password) {
    User.findOne({ email: email }, (error, user) => {
      // check if user exist
      if (error) {
        response.status(500).send({
          success: false,
          message: error.message,
        });
      } else {
        if (!user) {
          response.status(400).send({
            success: false,
            message: "The user does not exist",
          });
        } else {
          // check if password matches
          user.comparePassword(password, (error, isMatch) => {
            if (isMatch && !error) {
              // if user is found and password is right create a token
              // algorithm: process.env.JWT_TOKEN_HASH_ALGO
              const token = jwt.sign(
                user.toJSON(),
                "QOOC3nUVl9yTZiH2F0VYjOJhwm2ZkyBjWK7Mzo4bH54cNBBUQmp262S0Tx1eBBTT",
                {
                  algorithm: "HS256",
                  expiresIn: "1h",
                }
              );

              // return the information including token as JSON
              response.status(200).send({
                success: true,
                user: user,
                token: `JWT ${token}`,
              });
            } else {
              response.status(401).send({
                success: false,
                message: "The password is wrong",
              });
            }
          });
        }
      }
    });
  } else {
    return response.status(400).send({
      success: false,
      message: "Please provide your account",
    });
  }
};

// logout user will be on front part
// remove token

const AuthController = {
  register,
  login,
};

module.exports = AuthController;
