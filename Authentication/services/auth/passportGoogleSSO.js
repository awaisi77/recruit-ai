const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../../config/keys')
const Datasources = require('../../datasources');
const db = Datasources.getDatabase();



const callbackURL = 'http://localhost:4008/api/v1/auth/google/redirect'

passport.use(new GoogleStrategy({
    //option for the egoogle strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL:callbackURL , //redirect when you finish signin on google auth20
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, cb) => {
    
    const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
    };
  
    const user = await db.models.User.findOrCreate({
        where: { googleId: profile.id },
      defaults: defaultUser,
    }).catch((err) => {
      console.log("Error signing up", err);
      cb(err, null);
    });
  
  
    if (user && user[0]) return cb(null, user && user[0]);
  
  }
  
  ))
  
  passport.serializeUser((user, cb) => {
    console.log("Serializing user:", user);
    cb(null, user.id);
  });
  
  passport.deserializeUser(async (id, cb) => {
    const user = await db.models.User.findOne({ where: { id } }).catch((err) => {
      console.log("Error deserializing", err);
      cb(err, null);
    });
  
    console.log("DeSerialized user", user);
  
    if (user) cb(null, user);
  });
  
  