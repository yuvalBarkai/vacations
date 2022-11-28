const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authLogic = require("../business-logic-layer/auth-logic");
const config = require("../configuration.json");

router.post("/login", async (req, res) => {
    try {
        const body = req.body; // add validation 
        const user = await authLogic.getUserByUsernameAsync(body);
        if (!user || user.length < 1)
            res.status(401).send({ message: "Incorrent username or password" });
        else {
            user[0].token = jwt.sign({ user: user[0] }, config.jwtEncriptionKey, { expiresIn: "5m" });
            res.send(user[0]);
        }
    } catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

module.exports = router;