const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const phoneRegexp = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const addSchema = Joi.object({
    name: Joi.string().min(2)
    .max(30).required().messages({
        "any.required": `name must be exist`
    }),
    email: Joi.string().required().messages({
        "any.required": `email must be exist`
    }),
    phone: Joi.string().pattern(phoneRegexp).required().messages({
        "any.required": `phone must be exist`
    }),
    favorite: Joi.boolean().required().messages({
        "any.required": `missing field favorite`
    }),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": `missing field favorite`
    }),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        match: phoneRegexp,
        required: [true, 'Set phone for contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };