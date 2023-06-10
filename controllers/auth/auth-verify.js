const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const verify = async (req, res) => {
    const { verificationCode } = req.params;
    const user = await User.findOne({ verificationCode });
    if (!user) { 
        throw HttpError(404);
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: null });

    res.json({
        message: "Verification successful",
    })
};
 
module.exports = verify;