const express = require("express");
const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const validator = require("../validations/validator");
const adminLogic = require("../business-logic-layer/admin-logic");

const router = express.Router();

router.use([verifyLoggedIn, verifyAdmin]);

router.get("/verify", (req, res) => {
    res.send("Admin Ok");
});

router.delete("/vacations/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await adminLogic.deleteVacationByIdAsync(id);
        if (result.affectedRows < 1)
            res.status(400).send({ message: `The id ${id} was not found and was not deleted` });
        else
            res.send(result);

    } catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

router.post("/vacations", async (req, res) => {
    try {
        const body = req.body;
        const { error, value } = validator.vacation(body);
        if (error)
            return res.status(400).send(error.details)

        body.followers = 0;
        const result = await adminLogic.insertVacationAsync(body);
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

module.exports = router;