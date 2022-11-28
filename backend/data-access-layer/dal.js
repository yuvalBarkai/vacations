const db = require("mysql");
const config = require("../configuration.json");

const pool = db.createPool({
    host: config.dbHost,
    port: config.dbPort,
    database: config.dbName,
    user: config.dbUser
});

function executeQueryAsync(sqlCmd) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
    });
}

module.exports = { executeQueryAsync }