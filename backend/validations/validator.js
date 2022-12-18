const Joi = require("joi");

/**
 * A function that returns another function and allows us to create
 * different validating functions
 * 
 * @param {Joi.object} schema 
 * @returns {(payload)=> {errors, value}} A function that has a parameter
 * that will have the schema used on him with the validate function (abortEarly: true)
 */
const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: true });

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(40).required(),
});

const registerSchema = Joi.object({
    first_name: Joi.string().min(2).max(20).required(),
    last_name: Joi.string().min(2).max(20).required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(40).required(),
});

const vacationSchema = Joi.object({
    vacation_description: Joi.string().min(20).max(300).required(),
    vacation_destination: Joi.string().min(2).max(40).required(),
    start_date: Joi.date().greater(new Date()).required(),
    end_date: Joi.date().greater(Joi.ref("start_date")).required(),
    price: Joi.number().min(0).required(),
});

module.exports = {
    login: validator(loginSchema),
    register: validator(registerSchema),
    vacation: validator(vacationSchema),
}