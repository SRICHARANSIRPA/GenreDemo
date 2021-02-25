const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const Fawn = require("../middleware/fawn");
const _ = require("lodash");
const bcyrpt = require("bcrypt");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  console.log(req);
  const user = await User.findById(req.user._id).select("-password");
  console.log(user);
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("User Already Registered with this Mail Id");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcyrpt.genSalt(10);
  user.password = await bcyrpt.hash(user.password, salt);

  try {
    new Fawn.Task().save("users", user).run();
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (er) {
    console.log(er);
    res.status(500).send("Internal Error");
  }
});

module.exports = router;
