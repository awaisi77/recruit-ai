const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const keys = require('../../config/keys')
const Datasources = require('../../datasources');
const db = Datasources.getDatabase();

const callbackURL = 'http://localhost:4008/api/v1/auth/facebook/redirect'

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: callbackURL
  }, async (accessToken, refreshToken, profile, cb) =>  {

  const defaultUser = {
    fullName: profile.displayName,
    email: profile.emails && profile.emails[0] && profile.emails[0].value, // Check if email is provided
    picture: profile.photos && profile.photos[0] && profile.photos[0].value, // Check if photo is provided
    facebookId: profile.id
    }

    try {
        // Find or create the user based on Facebook ID
        const user = await db.models.User.findOrCreate({
            where: { facebookId: profile.id },
            defaults: defaultUser
        });
        
        // Pass user to callback
        cb(null, user[0]); 
    } catch (err) {
        console.log("Error signing up", err);
        cb(err, null);
    }

  }
));

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