const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.resolve("public/avatars");

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}_avatar`;

    try {
        const image = await Jimp.read(tmpUpload);
        await image.resize(250, 250).writeAsync(tmpUpload);
    } catch (err) {
    console.error(err);
    };

    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tmpUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL }, {new: true});

    res.json({
        avatarURL,
    })
};

module.exports = updateAvatar;
