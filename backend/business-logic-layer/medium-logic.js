const dal = require("../data-access-layer/dal");

function updateVacationFollowByIdAsync(id, isFollow) {
    let operator = "-";
    if (isFollow)
        operator = "+";

    return dal.executeQueryAsync(`
        UPDATE vacations SET followers = followers ${operator} "1" WHERE vacation_id = "${id}"
    `);
}

function insertFollowAsync(userId, vacationId) {
    return dal.executeQueryAsync(`INSERT INTO follows VALUES("${userId}", "${vacationId}")`);
}

function deleteFollowAsync(userId, vacationId) {
    return dal.executeQueryAsync(`
    DELETE FROM follows 
    WHERE user_id = "${userId}" 
    AND vacation_id = "${vacationId}"
    `);
}

function selectFollowedVacationsByUserIdAsync(userId) {
    return dal.executeQueryAsync(`SELECT vacation_id FROM follows WHERE user_id = "${userId}" `);
}

module.exports = {
    updateVacationFollowByIdAsync,
    insertFollowAsync,
    deleteFollowAsync,
    selectFollowedVacationsByUserIdAsync
}