const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Review = require('../models/review');


router.route('/reviews')
    .get(function(req, res) { //GET ALL
        Review.find(function(err, reviews) {
            if (err) res.send(err);
            res.json(reviews);
        });
    })
    .post(function(req, res) { // CREATE NOT APPROVED
      var newReview = new Review({
        user: req.body.user,
        rating: req.body.rating,
        body: req.body.body,
        place_id: req.body.place_id
      });

      newReview.save(function(err) {
          if (err) res.send(err);
          res.json({ message: 'Review created successfully!'});
      });
    });

router.route('/reviews/:review_id')
    .get(function(req, res) {
        Review.findById(req.params.review_id, function(err, review) {
            if (err) res.send(err);
            res.json(review);
        });
    })
    .put(function(req, res) {
        Review.findById(req.params.review_id, function(err, review) {
            if (err) res.send(err);
            review.user = req.body.user;
            review.rating = req.body.rating;
            review.body = req.body.body;
            review.place_id = req.body.place_id;
            review.save(function(err) {
                if (err) 
                    res.send(err);
                res.json({ message: 'Review successfully updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Review.remove({_id: req.params.review_id}, function(err, message) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted review!' });
        });
    });

router.route('/reviewsbyplace/:place_id')
.get(function(req, res) {
    console.log("objectID",mongoose.Types.ObjectId(req.params.place_id))
    Review.find({place_id: mongoose.Types.ObjectId(req.params.place_id)}, function(err, reviews) {
        if (err) res.send(err);
        res.json(reviews);
    });
})


module.exports = router;
