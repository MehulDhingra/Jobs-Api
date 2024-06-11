const { BadRequestError, UnauthenticatedError } = require('../errors');
const userModel = require('../models/User');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    console.log(req);
    const user = req.body;
    const { name, password, mail } = req.body;
    if (!name || !password || !mail) {
        throw new BadRequestError("Please fill all the details");
    }
    const regUser = await userModel.create({ ...req.body })
    const obj = regUser.createToken();
    res.status(201).json(obj);
};

const login = async (req, res) => {
    const { mail, password } = req.body
    console.log(req.body);

    const user = await userModel.findOne({ mail });
    console.log(user);
    const result = await user.checkPassword(password);
    if (!user) {
        throw new UnauthenticatedError("User not found");
    }
    if (result === false) {
        throw new UnauthenticatedError("Password do not match");
    }
    else {
        // console.log("else body");
        const obj = user.createToken();
        console.log(obj);
        res.status(200).json(obj);
    }
};

module.exports = { register, login };
