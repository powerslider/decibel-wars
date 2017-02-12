import passport from 'passport';
import LocalPassport from 'passport-local';
import mongoose from 'mongoose';


const User = mongoose.model('User');

export default function() {
    passport.use(new LocalPassport((username, password, done) => {
        User.findOne({username: username}).exec((err, user) => {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user && user.authenticate(password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

    passport.serializeUser((user, done) => {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser((id, done) => {
        User.findOne({_id: id}).exec((err, user) => {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
};