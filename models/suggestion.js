const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = mongoose.Schema({
    id: Schema.Types.ObjectId,
    username: String,
    email: String
});

const Place = mongoose.Schema({
    name: String,
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

// Suggestion Schema
const SuggestionSchema = mongoose.Schema({
    user: User,
    place: Place,
    isProcessed:{
        type: Boolean,
        default: false,
        required: true
    }
});

const Suggestion = module.exports = mongoose.model('Suggestion', SuggestionSchema);

