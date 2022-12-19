const config = require("../configuration.json");

/**
 * Verification middleware that validates if the user is an admin
 * @param {Request} req The request object
 * @param {Request} res The response object
 * @param {() => void} next keeps the pipeline going
 * 
 * If the user is not in the admin list it sends status 401 (Unauthorized (admin)).
 * Otherwise goes next().
 */
function verifyAdmin(req, res, next) {
    if (req.user && config.adminListUserId.includes(req.user.user_id)){
        next();
    }
    else
        res.status(401).send({ message: "Unauthorized (admin)" });
}

module.exports = verifyAdmin;