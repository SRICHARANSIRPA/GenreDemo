const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().max(255),
    isAdmin: Joi.boolean(),
  };
  return Joi.validate(user, schema);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

exports.User = mongoose.model("users", userSchema);
exports.validate = validateUser;
