const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { PROJECT_URL } = process.env;

const resendVerifyEmail = async (req, res) => { 
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        throw HttpError(404, "missing required field email");
    }
    if(user.verify) {
        throw HttpError(400, "Verification has already been passed"); 
    }

const verifyEmail = {
  to: email,
  subject: "Verify your email",
  html: `<a target="_blank" href="${PROJECT_URL}/api/auth/verify/${user.verificationCode}">Click to verify your email</a>`
};

    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email send"
    })
};

module.exports = resendVerifyEmail;