const Joi = require("joi");
const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const getAll = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  }
  catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result)
  }
  catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
  }
  catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Contact succesfully deleted"
    });
  }
  catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
}