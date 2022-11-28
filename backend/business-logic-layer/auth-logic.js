const dal = require("../data-access-layer/dal");

function getUserByUsernameAsync(credentials) {
    return dal.executeQueryAsync(`
    SELECT user_id, first_name, last_name, username FROM users WHERE 
    username = "${credentials.username}"
    AND
    password = "${credentials.password}"
    `);
}


module.exports = {
    getUserByUsernameAsync
}