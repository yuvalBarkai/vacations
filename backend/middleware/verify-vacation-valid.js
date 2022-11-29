const validator = require("../validations/validator");

function verifyVactionValid(req, res, next) {
    const body = req.body;
    const { error, value } = validator.vacation(body);
    if (error)
        return res.status(400).send(error.details);
    else
        next();
}

module.exports = verifyVactionValid;