const express = require("express");
const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyVactionValid = require("../middleware/verify-vacation-valid");
const adminLogic = require("../business-logic-layer/admin-logic");
const socketLogic = require("../business-logic-layer/socket-logic");

const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.use([verifyLoggedIn, verifyAdmin]);

/**
 * Deletes a certain vacation from the DB, also deletes its image on the server
 * if it is found and uses sockets function to update all users.
 * 
 * sends mySQL's success object or:
 * can send status 400 (vacationId was not found), or 500 (server error)
 * if there is an error. 
 */
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
            socketLogic.allUsersVacationsUpdate();
            res.send(result);
        }
    }
    catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

router.use([fileUpload(), verifyVactionValid]);

/**
 * - Posts a new vacation to the DB.
 * - Adds its image to the images folder with a randomlly generated unique name
 *   and addes the name and followers = 0 to the vacation before it is added.
 * 
 * sends mySQL's success object or:
 * can send status 400 (vacationId was not found), or 500 (server error)
 * if there is an error. 
 */
router.post("/vacations", async (req, res) => {
    try {
        const body = req.body;
        const image = req.files.image;
        if (!image)
            res.status(400).send({ message: "Error: please send an image with the vacation" });
        else {
            body.followers = 0;
            image.name = `${uuidv4()}.${image.name.split(".").pop()}`;
            body.image_location = image.name;
            const absolutePath = path.join(__dirname, "..", "images", image.name);
            await image.mv(absolutePath);
            const result = await adminLogic.insertVacationAsync(body);
            socketLogic.allUsersVacationsUpdate();
            res.status(201).send(result);
        }
    }
    catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

/**
 * - Changes a certain vacation from the DB
 * - deletes its old image and adds the new image to the images folder
 *   with a randomlly generated unique name.
 * - addes the name and followers = 0 to the vacation before it is added.
 * 
 * sends mySQL's success object or:
 * can send status 400 (Missing image), 404 (Not found id), 500 (Server Error)
 */
router.put("/vacations/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const imageResult = await adminLogic.selectImageNameByIdAsync(id);
        const absolutePath = path.join(__dirname, "..", "images", imageResult[0].image_location);
        if (fs.existsSync(absolutePath))
            fs.unlinkSync(absolutePath);

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
                socketLogic.allUsersVacationsUpdate();
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