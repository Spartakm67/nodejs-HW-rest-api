const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    
    if (bearer !== "Bearer") {
        next(HttpError(401));
    }
    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user) {
            next(HttpError(401));
        }
        next();
    } catch { 
        next(HttpError(401));
        }
};

module.exports = authenticate;