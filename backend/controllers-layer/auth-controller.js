const express = require("express");
const jwt = require("jsonwebtoken");
const authLogic = require("../business-logic-layer/auth-logic");
const config = require("../configuration.json");
const validator = require("../validations/validator");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        const { error, value } = validator.login(body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details);
        }

        const user = await authLogic.getUserByUsernameAsync(body);
        if (!user || user.length < 1)
            res.status(401).send({ message: "Incorrent username or password" });
        else {
            user[0].token = jwt.sign({ user: user[0] }, config.jwtEncriptionKey, { expiresIn: config.tokenExpirationTime });
            res.send(user[0]);
        }
    } catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

module.exports = router;