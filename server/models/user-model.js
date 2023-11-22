const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  // console.log("pre method", this);
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  // IF PASSWORD IS MODIFIED, OR NEW CREATE
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

// JSON WEB TOKEN (IMPORTANT)
// methods is the instance method of userSchema, iski help se kitne bhi functions
// create kr skte hai and use kisi bhi page me access kr skte hai
// In JWT, There are only 2 things, jwt.sign and jwt.verify,
// so to use npm i jsonwebtoken

// jwt.sign -> iit accept 2 parameter ie payload, and secret key that we put in dot env file
userSchema.methods.generateToken = async function () {
  try {
    // json web token ko return kr rahe hai, taki udr catch kar paye
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// define the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;
