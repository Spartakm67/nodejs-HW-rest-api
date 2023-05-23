const { ctrlWrapper } = require("../../decorators");

const register = require("./auth-register");
const login = require("./auth-login");

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
};
