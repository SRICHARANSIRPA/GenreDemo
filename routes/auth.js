const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const Fawn = require("../middleware/fawn");
const _ = require("lodash");
const bcyrpt = require("bcrypt");
const Joi = require("joi");
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");
  const validPassword = await bcyrpt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken();
  res.send(token);
});

const validate = (req) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required().max(255),
  };
  return Joi.validate(req, schema);
};

module.exports = router;
