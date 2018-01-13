const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Suggestion = require('../models/suggestion');
const Place = require('../models/place');


router.route('/suggestions')
    .get(function(req, res) { //GET ALL UNPROCESSED
        Suggestion.find({isProcessed: false},function(err, suggestions) {
            if (err) res.send(err);
            res.json(suggestions);
        });
    })
    .post(function(req, res) {
      var newSuggestion = new Suggestion({
        user: req.body.user,
        place: req.body.place
      });

      newSuggestion.save(function(err) {
          if (err) res.send(err);
          res.json({ message: 'Suggestion created successfully!'});
      });
    });

router.route('/suggestions/:suggestion_id')
    .put(function(req, res) {
        Suggestion.findById(req.params.suggestion_id, function(err, suggestion) {
            if (err) res.send(err);
            suggestion.isProcessed = req.body.isProcessed;
            suggestion.save(function(err) {
                if (err) 
                    res.send(err);
                res.json({ message: 'Suggestion successfully updated!' });

                var newPlace = new Place({
                    name: suggestion.place.name,
                    type: suggestion.place.type,
                    address: suggestion.place.address
                  });
            
                  newPlace.save(function(err) {
                      if (err) res.send(err);
                      res.json({ message: 'Place created successfully!'});
                  });
            });
        });
    })
    .delete(function(req, res) {
        Suggestion.remove({_id: req.params.suggestion_id}, function(err, message) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted suggestion!' });
        });
    });



module.exports = router;