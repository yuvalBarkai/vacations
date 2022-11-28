const jwt = require("jsonwebtoken");
const config = require("../configuration.json");

function verifyLoggedIn(req, res, next) {
    if (!req.headers.authorization)
        res.status(401).send({ message: "You are not logged-in" });
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
        res.status(401).send({ message: "You are not logged-in" });
    jwt.verify(token, config.jwtEncriptionKey, (err, decodedToken) => {
        if (err) {
            if (err.message == "jwt expired")
                res.status(403).send({ message: "You login session has expired" });
            else
                res.status(401).send({ message: "You are not logged-in" });
        }
        else {
            req.user = decodedToken.user;
            next();
        }
    });
}

module.exports = verifyLoggedIn;