const express = require("express");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = express.Router();

router.use(verifyLoggedIn);

router.get("/verify", (req, res) => {
    res.send("Medium Ok !");
});

module.exports = router;