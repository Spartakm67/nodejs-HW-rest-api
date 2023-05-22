const { ctrlWrapper } = require("../../decorators");

const register = require("./auth");

module.exports = {
    register: ctrlWrapper(register),
};
