function verifyAdmin(req, res, next) {
    if (req.user && req.user.user_id == 1)
        next();
    else
        res.status(401).send({ message: "Unauthorized (admin)" });
}

module.exports = verifyAdmin;