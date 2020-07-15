const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // the ref says to moongose that this is pointing to a User object
    ref: 'User',
  },
  name: {
    type: String,
    default: '',
  },
  locations: [pointSchema],
});

mongoose.model('Track', trackSchema);
