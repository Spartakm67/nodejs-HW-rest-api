const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    
    if (bearer !== "Bearer" || !token) {
        next(HttpError(401, "Invalid Bearer or token"));
    }
    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            next(HttpError(401));
        }
        req.user = user;
        next();
    } catch { 
        next(HttpError(401));
        }
};

module.exports = authenticate;