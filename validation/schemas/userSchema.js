import Joi from "joi";

export const userSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    role: Joi.string().valid("admin", "client","establishment").required()
});