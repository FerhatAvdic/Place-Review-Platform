const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = mongoose.Schema({
    id: Schema.Types.ObjectId,
    username: String,
    email: String
});

// Review Schema
const ReviewSchema = mongoose.Schema({
    user: [User],
    place_id: Schema.Types.ObjectId,
    rating: {
        type: Number,
        required: true
    },
    body:{
        type: String,
        required:true
    }
});

const Review = module.exports = mongoose.model('Review', ReviewSchema);

