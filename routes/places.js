const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Place = require('../models/place');


router.route('/places')
    .get(function(req, res) { //GET ALL
        Place.find(function(err, places) {
            if (err) res.send(err);
            res.json(places);
        });
    })
    .post(function(req, res) { // CREATE NOT APPROVED
      var newPlace = new Place({
        name: req.body.name,
        type: req.body.type,
        address: req.body.address
      });

      newPlace.save(function(err) {
          if (err) res.send(err);
          res.json({ message: 'Place created successfully!'});
      });
    });

router.route('/places/isApproved')
.post(function(req, res) { //CREATE APPROVED
    var newPlace = new Place({
      name: req.body.name,
      type: req.body.type,
      address: req.body.address,
      isApproved: req.body.isApproved
    });

    newPlace.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Place created successfully!'});
    });
});
router.route('/places/isApproved/:bool')
.get(function(req, res) { // GET APPROVED OR NOT APPROVED
    Place.find({isApproved: bool}, function(err, place) {
        if (err) res.send(err);
        res.json(place);
    });
});

router.route('/places/:place_id')
    .get(function(req, res) {
        Place.findById(req.params.place_id, function(err, place) {
            if (err) res.send(err);
            res.json(place);
        });
    })
    .put(function(req, res) {
        Place.findById(req.params.place_id, function(err, place) {
            if (err) res.send(err);
            place.name = req.body.name;
            place.type = req.body.type;
            place.address = req.body.address;
            place.save(function(err) {
                if (err) 
                    res.send(err);
                res.json({ message: 'Place successfully updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Place.remove({_id: req.params.place_id}, function(err, message) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted place!' });
        });
    });


router.route('/places/approval/:place_id')
    .put(function(req, res) { // APPROVE OR DECLINE PLACE
        Place.findById(req.params.place_id, function(err, place) {
            if (err) res.send(err);
            place.isApproved = req.body.isApproved;
            place.save(function(err) {
                if (err) 
                    res.send(err);
                res.json({ message: 'Place successfully updated!' });
            });
        });
    });

module.exports = router;
