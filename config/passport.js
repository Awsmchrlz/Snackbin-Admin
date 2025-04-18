

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Administrator = require('../src/models/administrator').default;

module.exports = function (passport) {

  passport.use('adminstrator',
    new LocalStrategy({ usernameField: 'emailAddress' }, async (emailAddress, password, done) => {
      try {
        const user = await Administrator.findOne({ emailAddress });
        if (!user) {
          return done(null, false, { message: 'Check your email address.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect Password.' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Administrator.findById(id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
