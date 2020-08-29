const Joi = require("joi");

module.exports.UserValidationSchema = Joi.object().keys({
    userId: Joi.number().positive().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    type: Joi.string().valid("admin", "moderator", "user").required(),
    phone: Joi.string().optional().allow(null),
})