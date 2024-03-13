const passport = require('passport')
const GithubStrategy = require('passport-github2').Strategy
const keys = require('../../config/keys')
const Datasources = require('../../datasources');
const db = Datasources.getDatabase();



const callbackURL = 'http://localhost:4008/api/v1/auth/github/redirect'

passport.use(new GithubStrategy({
    //option for the egoogle strategy
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL:callbackURL , //redirect when you finish signin on google auth20
  }, async (accessToken, refreshToken, profile, cb) => {
    
    const defaultUser = {
        fullName: profile.displayName || profile.username,
        // GitHub doesn't always provide email address publicly, so we may not always have it
        email: profile.emails && profile.emails[0] && profile.emails[0].value,
        picture: profile.photos && profile.photos[0] && profile.photos[0].value,
        githubId: profile.id
    };
  
    const user = await db.models.User.findOrCreate({
        where: { githubId: profile.id },
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
  
  