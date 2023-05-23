const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const login = async (req, res, next) => {
    
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new HttpError(401, "Invalid credentials");
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "23h",
    });

        res.json({ token });
    } 
        
module.exports = login;