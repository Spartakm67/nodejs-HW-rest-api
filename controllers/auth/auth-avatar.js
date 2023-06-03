const { User } = require("../../models/user");
// const { HttpError } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.resolve("public/avatars");
// const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}_avatar`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    })
};

module.exports = updateAvatar;
