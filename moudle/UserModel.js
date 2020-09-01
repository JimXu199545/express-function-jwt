const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const { Schema } = mongoose;

// prepare mongoose user schema
// eslint-disable-next-line new-cap
const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: true, // required
    },
    lastName: {
      type: String,
      required: true, // required
    },
    password: {
      type: String,
      required: true, // required
    },
    email: {
      type: String,
      required: true, // required
      unique: true, // unique email
      trim: true,
    },
    username: {
      type: String,
      unique: true, // unique username
      required: true, // required
      trim: true,
    },
    birthday: String,
    job: String,
  },
  {
    collection: "User",
  }
);



// pass passport-local-mongoose plugin
// in order to handle password hashing
userSchema.plugin(passportLocalMongoose);

// export mongoose user schema module
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
