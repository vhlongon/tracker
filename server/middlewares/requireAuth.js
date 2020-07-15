const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { tokenKey } = require('../secret');

const User = mongoose.model('User');

module.exports = (req, res, next) => {
  // express automatically lowercases parameters sent
  // authorization === 'Bearer the_token_etc'
  const { authorization } = req.headers;

  // if there is a problem with authorization return an opaque error message
  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in' });
  }

  const token = authorization.replace('Bearer ', '');
  return jwt.verify(token, tokenKey, async (error, payload) => {
    if (error) {
      return res.status(401).send({ error: 'You must be logged in' });
    }
    // otherwise we get the userId. each was created from the `_id` prop automatically created by mongo db when creating a new user
    // and go to the db and fetch information regarding that specific user

    const { userId } = payload;

    const user = await User.findById(userId);

    // add the info to the request object and run the next function in the middleware chain
    req.user = user;
    return next();
  });
};
