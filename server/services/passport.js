const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accesToken, refreshToken, profile) => {
      User.findOne({ googleID: profile.id }).then((existingUser) => {
        if (!existingUser) {
          new User({ googleID: profile.id }).save();
        }
      });
    }
  )
);
