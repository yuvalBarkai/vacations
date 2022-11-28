const express = require("express");
const validator = require("../validations/validator");
const publicLogic = require("../business-logic-layer/public-logic");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const newUser = req.body;
        const { error, value } = validator.register(newUser);
        if (error)
            return res.status(400).send(error.details)

        const result = await publicLogic.insertUserAsync(newUser);
        res.send(result);

    } catch (err) {
        if (err.code == 'ER_DUP_ENTRY')
            res.status(400).send({ message: "That username is taken" });
        else
            res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

module.exports = router;