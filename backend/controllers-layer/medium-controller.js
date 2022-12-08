const express = require("express");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const mediumLogic = require("../business-logic-layer/medium-logic");
const router = express.Router();


router.use(verifyLoggedIn);

router.get("/verify", (req, res) => {
    res.send("Medium Ok !");
});

router.patch("/follow/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const isFollow = req.body.isFollow;
        if (isFollow != false && isFollow != true)
            res.status(400).send({ message: `isFollow propery is missing` });
        else {
            const result = await mediumLogic.patchVacationFollowByIdAsync(id, isFollow);
            if (result.affectedRows < 1)
                res.status(404).send({ message: `The id ${id} was not found` });
            else {
                res.send(result);
                mediumLogic.allUsersVacationUpdate();
            }
        }
    } catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

module.exports = router;