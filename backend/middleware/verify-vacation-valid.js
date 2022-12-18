const validator = require("../validations/validator");

/**
 * Checks the vacation entered using the validator function
 * 
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @param {() => void} next keeps the pipeline going
 * 
 * If there are errors they are sent with status 400.
 * Otherwise it goes next()
 */

function verifyVactionValid(req, res, next) {
    const body = req.body;
    const { error } = validator.vacation(body);
    if (error)
        res.status(400).send(error.details);
    else
        next();
}

module.exports = verifyVactionValid;