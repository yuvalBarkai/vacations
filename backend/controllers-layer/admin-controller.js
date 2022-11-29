const express = require("express");
const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyVactionValid = require("../middleware/verify-vacation-valid");
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
            res.status(400).send({ message: `Error: The id ${id} was not found and was not deleted` });
        else
            res.send(result);
    }
    catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

router.use(verifyVactionValid);

router.post("/vacations", async (req, res) => {
    try {
        const body = req.body;
        body.followers = 0;
        // add image_location and handle the image

        const result = await adminLogic.insertVacationAsync(body);
        res.send(result);
    }
    catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

router.put("/vacations/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        // add image_location and handle the image

        const result = await adminLogic.updateVacationByIdAsync(id, body);
        if (result.affectedRows < 1)
            res.status(404).send({ message: `Error: The id ${id} was not found` });
        else
            res.send(result);
    }
    catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

module.exports = router;