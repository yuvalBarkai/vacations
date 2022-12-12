const express = require("express");
const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyVactionValid = require("../middleware/verify-vacation-valid");
const adminLogic = require("../business-logic-layer/admin-logic");
const mediumLogic = require("../business-logic-layer/medium-logic");

const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.use([verifyLoggedIn, verifyAdmin]);

router.get("/verify", (req, res) => {
    res.send("Admin Ok");
});

router.delete("/vacations/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const imageResult = await adminLogic.selectImageNameByIdAsync(id);
        const absolutePath = path.join(__dirname, "..", "images", imageResult[0].image_location);
        if (fs.existsSync(absolutePath))
            fs.unlinkSync(absolutePath);
        const result = await adminLogic.deleteVacationByIdAsync(id);
        if (result.affectedRows < 1)
            res.status(400).send({ message: `Error: The id ${id} was not found and was not deleted` });
        else {
            mediumLogic.allUsersVacationUpdate();
            res.send(result);
        }
    }
    catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

router.use([fileUpload(), verifyVactionValid]);


router.post("/vacations", async (req, res) => {
    try {
        const body = req.body;
        const image = req.files.image;
        if (!image)
            res.status(400).send({ message: "Error: please send a picture with the vacation" });
        else {
            body.followers = 0;
            image.name = `${uuidv4()}.${image.name.split(".").pop()}`;
            body.image_location = image.name;
            const absolutePath = path.join(__dirname, "..", "images", image.name);
            await image.mv(absolutePath);
            const result = await adminLogic.insertVacationAsync(body);
            mediumLogic.allUsersVacationUpdate();
            res.send(result);
        }
    }
    catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

// router.use(express.json());

router.put("/vacations/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const image = req.files.image;
        if (!image)
            res.status(400).send({ message: "Error: please send a picture with the vacation" });
        else {
            image.name = `${uuidv4()}.${image.name.split(".").pop()}`;
            body.image_location = image.name;
            const absolutePath = path.join(__dirname, "..", "images", image.name);
            await image.mv(absolutePath);
            const result = await adminLogic.updateVacationByIdAsync(id, body);
            if (result.affectedRows < 1)
                res.status(404).send({ message: `Error: The id ${id} was not found` });
            else {
                mediumLogic.allUsersVacationUpdate();
                res.send(result);
            }
        }
    }
    catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

module.exports = router;