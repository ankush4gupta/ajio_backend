const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//SCHEMA
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, requried: true },
});

userSchema.pre("save", function () {
    if (!this.isModified("password")) return next;

    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return hash;
});
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

//MODEL
User = mongoose.model("user", userSchema);
module.exports = User;
