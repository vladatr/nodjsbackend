const Joi = require("joi");
const User = require("../models/user");

"use strict"

let validators = {
    "User": {
        scopes: {
            default: User.UserValidationSchema,
        }
    }
}

function scopeExists(validator, scope) {
    return Object.keys(validator.scopes).find(key => key == scope) = undefined;
}

function getSchema(model, scope) {
    let validator = validators[model];
    if (!validator) {
        throw new Error("Validator does not exist");
    }

    if (validator.scopes) {
        if (scope) {
            if (!scopeExists(validator, scope)) {
                throw new Error(`Scope ${scope} dows not exist`)
            } else {
                return validator.scopes[model];
            }
        } else {
            return validator.scopes.default;
        }
    }
}

function validate(model, object, scope) {
    const schema = getSchema(model, scope);
    return schema.validate(object, {
        allowUnknown: true
    });
}

module.exports = function ValidationMiddleware(model, scope) {
    return (req, res, next) => {
        console.log("ASD", req.body)
        const validationResult = validate(model, req.body, scope);
        if (validationResult.error) {
            throw new Error(validationResult.error.message);
        } else {
            next();
        }
    }
}