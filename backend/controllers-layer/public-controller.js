const express = require("express");
const validator = require("../validations/validator");
const publicLogic = require("../business-logic-layer/public-logic");
const fs = require("fs");
const path = require("path");
const configuration = require("../configuration.json");
const router = express.Router();

/**
 * - Validates if the information it was send.
 * - Checks if the username isnt taken.
 * 
 * Sends the mySQL success object or:
 * status 400 (Bad request), 409 (Duplicate Entry), 500 (Server Error)
 */
router.post("/register", async (req, res) => {
    try {
        const newUser = req.body;
        const { error } = validator.register(newUser);
        if (error)
            return res.status(400).send(error.details)

        const result = await publicLogic.insertUserAsync(newUser);
        res.status(201).send(result);

    } catch (err) {
        if (err.code == 'ER_DUP_ENTRY')
            res.status(409).send({ message: "That username is taken" });
        else {
            res.status(500).send({ message: "Error: Server Error" });
            console.log(err);
        }
    }
});

/**
 * - Checks if the imageName parameter is a file name in the images folder
 * - If its not swaps the address with a configed ImgName that represents
 *   a not found image.
 * 
 * Sends the file from the imageAddress.
 */
router.get("/images/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    let imageAddress = path.join(__dirname, "..", "images", imageName);
    if (!fs.existsSync(imageAddress))
        imageAddress = path.join(__dirname, "..", "images", configuration.notFoundImgName);

    res.sendFile(imageAddress);
});

module.exports = router;