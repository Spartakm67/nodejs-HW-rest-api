const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().min(2)
    .max(30).required().messages({
        "any.required": `name must be exist`
    }),
    email: Joi.string().required().messages({
        "any.required": `email must be exist`
    }),
    phone: Joi.string().pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      { name: "numbers" }
    ).required().messages({
        "any.required": `phone must be exist`
    }),
});

module.exports = {
    addSchema,
}