const fs = require("fs/promises");
const path = require("path");
const { Contact } = require("../../models/contact");

const contactsPath = path.resolve("public", "avatars");

const add = async (req, res) => {
    const {path: tmpDir, originalname} = req.file;
    const newPath = path.join(contactsPath, originalname);
    await fs.rename(tmpDir, newPath);
    const avatar = path.join("avatars", originalname);
  
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, avatar, owner });
  res.status(201).json(newContact);
  
};

module.exports = add;