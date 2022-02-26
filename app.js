const express = require("express");
var cors = require("cors");
const path = require("path");
const connect = require("./configs/db");
const app = express();
const static_path = path.join(__dirname, "./public");
const productcontroller = require("./controllers/product.controller");
const { register, login, newToken } = require("./controllers/authControllers");
const passport = require("./configs/google-Oauth");
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 2555;
app.use(express.static(static_path));

//  index route

app.get("", (req, res) => {
    try {
        res.send("homepage");
    } catch (error) {
        res.send(error);
    }
});

// login & register route
app.post("/register", register);
app.post("/login", login);

// google auth
// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });

// app.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
//     "/auth/google/callback",
//     passport.authenticate("google", {
//         // successRedirect: static_path,
//         failureRedirect: "/auth/google/failure",
//     }),
//     (req, res) => {
//         const { user } = req;
//         const token = newToken(user);
//         return res.send({ user, token });
//     }
// );

// product route
app.use("/product", productcontroller);

// connect function
app.listen(port, async () => {
    try {
        await connect();
        console.log("listening port 2555");
    } catch (error) {
        console.log(error.message);
    }
});
