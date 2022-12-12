const express = require("express");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const mediumLogic = require("../business-logic-layer/medium-logic");
const router = express.Router();


router.use(verifyLoggedIn);

router.get("/verify", (req, res) => {
    res.send("Medium Ok !");
});

router.get("/followed/:userId", async (req, res) => {
    try {
        const result = await mediumLogic.selectFollowedVacationsByUserIdAsync(req.params.userId);
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

router.patch("/follow/:id", async (req, res) => {
    try {
        const vacationId = req.params.id;
        const isFollow = req.body.isFollow;
        const userId = req.body.userId;
        if (isFollow != false && isFollow != true && userId)
            res.status(400).send({ message: `isFollow/userId properties are missing` });
        else {
            const result = await mediumLogic.updateVacationFollowByIdAsync(vacationId, isFollow);
            if (result.affectedRows < 1)
                res.status(404).send({ message: `The id ${vacationId} was not found` });
            else {
                isFollow ? await mediumLogic.insertFollowAsync(userId, vacationId)
                    : await mediumLogic.deleteFollowAsync(userId, vacationId);
                res.send(result);
                mediumLogic.allUsersVacationUpdate();
            }
        }
    } catch (err) {
        if (err.code == 'ER_DUP_ENTRY')
            res.status(409).send({message:"Error: duplicate follow"});
        else
            res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

module.exports = router;