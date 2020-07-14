const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    res.send("you made a post request");
  } catch (error) {
    return res.status(422).send(error.message); // invalid data
  }
});

module.exports = router;
