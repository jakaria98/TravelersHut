const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Visitor = require("./model/Visitor");
const Guide = require("./model/Guide");
const Admin = require("./model/Admin");

const visitor = {};
visitor.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
visitor.secretOrKey = "VISITOR";

const guide = {};
guide.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
guide.secretOrKey = "GUIDE";

const admin = {};
admin.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
admin.secretOrKey = "ADMIN";

module.exports = (passport) => {
  passport.use(
    "visitor",
    new JwtStrategy(visitor, (payload, done) => {
      Visitor.findOne({ _id: payload._id })
        .then((user) => {
          if (!user) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch((error) => {
          console.log(error);
          return done(error);
        });
    })
  );

  passport.use(
    "guide",
    new JwtStrategy(guide, (payload, done) => {
      Guide.findOne({ _id: payload._id })
        .then((user) => {
          if (!user) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch((error) => {
          console.log(error);
          return done(error);
        });
    })
  );

  passport.use(
    "admin",
    new JwtStrategy(admin, (payload, done) => {
      Admin.findOne({ _id: payload._id })
        .then((user) => {
          if (!user) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch((error) => {
          console.log(error);
          return done(error);
        });
    })
  );
};
