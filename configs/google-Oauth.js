// require("dotenv").config();
// const { v4: uuidv4 } = require("uuid");

// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const User = require("../models/userModel");
// const passport = require("passport");
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: `${process.env.GOOGLE_CLIENT_ID}`,
//             clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
//             callbackURL: "/auth/google/callback",
//             // callbackURL: "http://localhost:2555/auth/google/callback",
//             passReqToCallback: true,
//         },
//         async function (request, accessToken, refreshToken, profile, done) {
//             let user = await User.findOne({ email: profile?.email })
//                 .lean()
//                 .exec();

//             if (!user) {
//                 user = await User.create({
//                     email: profile?.email,
//                     password: uuidv4(),
//                 });
//             }

//             return done(null, user);
//         }
//     )
// );

// module.exports = passport;
