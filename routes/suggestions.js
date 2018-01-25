const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Suggestion = require('../models/suggestion');
const Place = require('../models/place');


router.route('/suggestions')
    .post(passport.authenticate('userJWT', { session: false }),function(req, res) {
        var newSuggestion = new Suggestion({
        user: req.body.user,
        place: req.body.place
        });

        newSuggestion.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Suggestion created successfully!'});
        });
    })
    .get(passport.authenticate('adminJWT', { session: false }), function(req, res) { //GET ALL UNPROCESSED
        Suggestion.find({isProcessed: false},function(err, suggestions) {
            if (err) res.send(err);
            res.json(suggestions);
        });
    });

router.route('/mysuggestions/:user_id')
    .get(passport.authenticate('userJWT', { session: false }), function(req, res) { //GET ALL BY USER
        Suggestion.find({'user.id': mongoose.Types.ObjectId(req.params.user_id), isProcessed: false},function(err, suggestions) {
            if (err) res.send(err);
            res.json(suggestions);
        });
    });

router.route('/suggestions/:suggestion_id')
    .put(passport.authenticate('userJWT', { session: false }), function(req, res) {
        Suggestion.findById(req.params.suggestion_id, function(err, suggestion) {
            if (err) res.send(err);
            else{
                suggestion.isProcessed = req.body.isProcessed;
                suggestion.save(function(err) {
                    if (err) res.send(err);
                    else{
                        var newPlace = new Place({
                            name: suggestion.place.name,
                            type: suggestion.place.type,
                            address: suggestion.place.address
                            });
                        newPlace.save(function(err) {
                            if (err) res.send(err);
                            else{
                                res.json({ message: 'Place created successfully!'});
                            }
                        });
                    }
                });
            }
            
        });
    })
    .delete(passport.authenticate('userJWT', { session: false }), function(req, res) {
        Suggestion.remove({_id: req.params.suggestion_id}, function(err, message) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted suggestion!' });
        });
    });



module.exports = router;
