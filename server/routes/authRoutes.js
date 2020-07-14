const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { tokenKey } = require("../secret");

const User = mongoose.model("User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, tokenKey);
    res.send({ token });
  } catch (error) {
    return res.status(422).send(error.message); // invalid data
  }
});

module.exports = router;
