const { ctrlWrapper } = require("../../decorators");

const register = require("./auth-register");
const login = require("./auth-login");
const getCurrent = require("./auth-current");
const logout = require("./auth-logout");
const updateSubscription = require("./auth-subscription");

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
};
