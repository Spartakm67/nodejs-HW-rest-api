const { ctrlWrapper } = require("../../decorators");

const addContact = require('./addContact');
const getById = require('./getById');
const deleteById = require('./deleteById');
const getAll = require('./getAll');
const updateById = require('./updateById');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
    addContact: ctrlWrapper(addContact),
    getById: ctrlWrapper(getById),
    deleteById: ctrlWrapper(deleteById),
    getAll: ctrlWrapper(getAll),
    updateById: ctrlWrapper(updateById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};