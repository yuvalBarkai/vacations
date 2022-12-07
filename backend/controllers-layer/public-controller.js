const express = require("express");
const validator = require("../validations/validator");
const publicLogic = require("../business-logic-layer/public-logic");
const fs = require("fs");
const path = require("path");

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
            res.status(401).send({ message: "That username is taken" });
        else
            res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

router.get("/images/:imageName", (req, res) => {
    try{
        const imageName = req.params.imageName;
        let imageAddress = path.join(__dirname,"..", "images", imageName);
        if(!fs.existsSync(imageAddress))
            imageAddress = path.join(__dirname,"..", "images", "notFoundTemplate.png");

        res.sendFile(imageAddress);
    } catch(err){
        res.status(500).send({ message: "Server Error" });
        console.log(err);
    }
});

module.exports = router;