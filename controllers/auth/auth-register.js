const bcrypt = require("bcrypt");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const register = async (req, res, next) => {

    const { email, password } = req.body;
    const userEmail = await User.findOne({ email });
    const userPassword = await User.findOne({ password });

    if (userEmail) {
        throw HttpError(409, "Email in use");
    }
    if (userPassword) {
        throw HttpError(409, "Password in use");
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
        subscription: newUser.subscription,
    });
};

module.exports = register;