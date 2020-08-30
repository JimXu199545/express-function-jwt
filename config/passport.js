const passportJWT = require("passport-jwt");
const User = require("../moudle/UserModel");

// passport & jwt config
const { Strategy: JWTStrategy, ExtractJwt: ExtractJWT } = passportJWT;

// define passport jwt strategy
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey =
  "QOOC3nUVl9yTZiH2F0VYjOJhwm2ZkyBjWK7Mzo4bH54cNBBUQmp262S0Tx1eBBTT";
opts.algorithms = ["HS256"];
const passportJWTStrategy = new JWTStrategy(opts, function (jwtPayload, done) {
  // retreive mail from jwt payload
  const email = jwtPayload.email;
  User.findOne({ email: email }, (error, user) => {
    if (error) {
      return done(error, false);
    } else {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }
  });
});

// config passport
module.exports = function (passport) {
  // token strategy
  passport.use(passportJWTStrategy);

  // return configured passport
  return passport;
};
