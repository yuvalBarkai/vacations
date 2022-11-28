const Joi = require("joi");
// https://www.youtube.com/watch?v=_svzevhv4vg

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false });


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
    image_location: Joi.string().max(100).required(),
    start_date: Joi.date().greater(new Date()).required(),
    end_date: Joi.date().greater(Joi.ref("start_date")).required(),
    price: Joi.number().min(0).required(),
});

module.exports = {
    login: validator(loginSchema),
    register: validator(registerSchema),
    vacation: validator(vacationSchema),
}