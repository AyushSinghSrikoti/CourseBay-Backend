const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
require('dotenv').config();

// console.log(process.env.SENDER_MAIL);

passport.use(new GoogleStrategy({
    clientID: "413621638920-telqiemcarfo7f7dk8l0i96bkcbbmgbj.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://coursebay-backend-a1dy.onrender.com/users/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            return done(null, user);
        } else {
            const newUser = await User.create({
                username: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });

            return done(null, newUser);
        }
    } catch (error) {
        console.log('Error in Google strategy passport', error);
        return done(error, null);
    }
}));

module.exports = passport;
