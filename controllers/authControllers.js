require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const newToken = (user) => {
    return jwt.sign({ user }, `${process.env.SECRET_KEY}`);
};

const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        //CHECK IF USER ALREADY PRESENT
        if (user) {
            return res.send("User already exist");
        }
        user = await User.create(req.body);
        const token = newToken(user);

        return res.send({ user, token });
    } catch (err) {
        console.log(err);
    }
};

const login = async (req, res) => {
    try {
        //FIND THE USER
        let user = await User.findOne({ email: req.body.email });

        //if user not fond send error
        if (!user) {
            return res
                .status(400)
                .send({ message: "Please enter valid details" });
        }
        const match = user.checkPassword(req.body.password);

        if (!match) {
            res.status(400).send({ message: "Please enter valid details" });
        }

        const token = newToken(user);
        res.send({ user, token });
    } catch (err) {
        console.log(err);
    }
};

module.exports = { register, login, newToken };
