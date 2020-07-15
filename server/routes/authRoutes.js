const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { tokenKey } = require('../secret');

const User = mongoose.model('User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const { _id: userId } = user;
    const token = jwt.sign({ userId }, tokenKey);
    return res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: error.message }); // invalid data
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  // get the user by the email provided
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: 'invalid password or email' });
  }

  try {
    await user.comparePassword(password);
    const { _id: userId } = user;
    const token = jwt.sign({ userId }, tokenKey);
    return res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: 'invalid password or email' });
  }
});

module.exports = router;
