const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    // if (!bearer ||!token) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded;
    //     next();
    // } catch (err) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
    if (bearer !== "Bearer") {
        next(HttpError(401, { message: "Not authorized" }));
    }
    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user) {
            next(HttpError(401, { message: "Not authorized" }));
        }
        next();
    } catch { 
        next(HttpError(401, { message: "Not authorized" }));
        }
};

module.exports = authenticate;