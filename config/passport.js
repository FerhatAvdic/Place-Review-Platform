const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use('adminJWT', new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user.role === 'admin') {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    })); 
    passport.use('userJWT', new JwtStrategy(opts, (jwt_payload, done) => {
        //console.log("jwt_payload", jwt_payload);
        User.findById(jwt_payload._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}
