const dal = require("../data-access-layer/dal");

function insertUserAsync(newUser) {
    return dal.executeQueryAsync(`
    INSERT INTO 
    users (first_name, last_name, username, password)
    VALUES ("${newUser.first_name}","${newUser.last_name}","${newUser.username}","${newUser.password}")
    `)
}

module.exports = {
    insertUserAsync
}