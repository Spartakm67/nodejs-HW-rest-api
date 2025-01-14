const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            },
        email: {
            type: String,
            match: [emailRegex, "Please enter a valid email address"],
            unique: true,
            required: [true, 'Email is required'],
            },
        password: {
            type: String,
            required: [true, 'Set password for user'],
            unique: true,
            minlength: 6,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
       },
        token: {
            type: String,
            default: "",
        },
        avatarURL: {
            type: String,
            required: true,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: String,
            required: [true, 'Verify Code-token is required'],
        }
    }, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError); 

const registerSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
});

const userSchemas = {
    registerSchema,
    loginSchema,
    emailSchema,
};

const User = model("user", userSchema);

module.exports = { User, userSchemas };