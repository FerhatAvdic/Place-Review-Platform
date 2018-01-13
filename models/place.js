const mongoose = require('mongoose');

// Place Schema
const PlaceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type:{
    type: String,
    enum: ['restaurant','cafe','nightlife','outdoors','art','hotel','shopping','relaxation','sport', 'other'],
    default: 'other',
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Place', PlaceSchema);
