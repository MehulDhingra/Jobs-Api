const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter username"]
    },
    password: {
        type: String,
        required: [true, "Enter password"]
    },
    mail: {
        type: String,
        required: [true, "Enter mail"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please enter valid mail"],
        unique: true
    },

});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.createToken = function () {
    const token = jwt.sign({ id: this._id, username: this.name }, 'jwtsecret',{expiresIn:"30d"});
    const obj = { name: this.name, token: token };
    return obj;
}

userSchema.methods.checkPassword = function (candidatePassword) {
    const isMatch = bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};



const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;

