const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");
const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  // we get the user in req here because our middleware attaches the user object to the request object
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

module.exports = router;
