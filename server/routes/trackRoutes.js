const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');
const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
  // we get the user in req here because our middleware attaches the user object to the request object
  const { _id: userId } = req.user;
  const tracks = await Track.find({ userId });

  res.send(tracks);
});

router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res.status(422).send({ error: 'You must provided name and locations' });
  }

  try {
    const { _id: userId } = req.user;
    const track = new Track({ name, locations, userId });
    await track.save();
    return res.send(track);
  } catch (error) {
    return res.status(422).send({ error: error.message });
  }
});

module.exports = router;
