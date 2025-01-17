const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const _ = require('lodash');
const sendWelcomeEmail = require('./sendgridMailer');

const User = mongoose.model('users');
const Email = mongoose.model('emails');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      const email =_.map( profile.emails, ({ value }) => { return value });
      const emailAddress = email[0]
      const firstName = profile.name['givenName'];
      const lastName = profile.name['familyName'];

      if (existingUser) {
        return done(null, existingUser);
      }

      sendWelcomeEmail(emailAddress, firstName);

      const addToEmailList = await new Email( {
        firstName, 
        lastName, 
        email: emailAddress,
        email_notifications: true
      }).save();
      const user = await new User({ 
        googleId: profile.id, 
        firstName, 
        lastName, 
        email: emailAddress, 
        pro: true,
        pro_date_start: 20201220,
        pro_date_end: 20211220,
        notifications_enabled: true,
        owned_affiliated_prods: false,
        meds_taken: ['a', 'b', 'c'],
        regular: false,
      }).save();

      done(null, user, addToEmailList);
    }
  )
);