import passport from 'passport';
import LocalStrategy from 'passport-local';
import SpotifyStrategy from 'passport-spotify';
import mongoose from 'mongoose';


const User = mongoose.model('User');

export default function () {
    passport.use(new LocalStrategy((username, password, done) => {
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

    // passport.use(new SpotifyStrategy.Strategy({
    //         clientID: APP_KEY,
    //         clientSecret: APP_SECRET,
    //         callbackURL: "/auth/spotify/callback"
    //     },
    //     (accessToken, refreshToken, profile, done) => {
    //         User.findOrCreate({spotifyId: profile.id}, function (err, user) {
    //             return done(err, user);
    //         });
    //     }
    // ));

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