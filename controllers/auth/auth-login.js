const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const login = async (req, res, next) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(400, "Email or password is incorrect");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw HttpError(401, "Invalid credentials");
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "23h",
    });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        "user": {
            email: user.email,
            subscription: user.subscription
        }
    });
}; 
        
module.exports = login;