const express = require("express");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const mediumLogic = require("../business-logic-layer/medium-logic");
const socketLogic = require("../business-logic-layer/socket-logic");
const router = express.Router();

router.use(verifyLoggedIn);

/**
 * - gets an array of the vacations that a certain user follows
 * 
 * sends a (vacation_id: number)[]:
 * or status 500 (Server Error)
 */
router.get("/followed/:userId", async (req, res) => {
    try {
        const result = await mediumLogic.selectFollowedVacationsByUserIdAsync(req.params.userId);
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

/**
 * - Validates if it got isFollow boolean that indicates 
 *   if it should follow or unfollow
 * - Updates certain vacation follower count in the DB
 * - validates if the id of the vacation was found
 * - either deletes or addes the follow from follows table in the DB
 * 
 * Sends the success object of the updated followers count or:
 * status 400 (isFollow is missing), 404 (vacationId was not found),
 * 409 (Duplicate Entry), 500 (Server Error)
 */
router.patch("/follow/:vacationId", async (req, res) => {
    try {
        const vacationId = req.params.vacationId;
        const isFollow = req.body.isFollow;
        const userId = req.user.user_id;
        console.log(userId);
        if (isFollow != false && isFollow != true)
            res.status(400).send({ message: `isFollow property is missing` });
        else {
            const result = await mediumLogic.updateVacationFollowByIdAsync(vacationId, isFollow);
            if (result.affectedRows < 1)
                res.status(404).send({ message: `The id ${vacationId} was not found` });
            else {
                isFollow ? await mediumLogic.insertFollowAsync(userId, vacationId)
                    : await mediumLogic.deleteFollowAsync(userId, vacationId);
                res.send(result);
                socketLogic.allUsersVacationsUpdate();
            }
        }
    } catch (err) {
        if (err.code == 'ER_DUP_ENTRY')
            res.status(409).send({ message: "Error: duplicate follow" });
        else
            res.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

module.exports = router;