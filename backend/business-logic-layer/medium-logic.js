const io = require("socket.io");
const dal = require("../data-access-layer/dal");

let socketsManager;

function socketInit(listener) {
    socketsManager = io(listener, { cors: { origin: "*" } });

    const allUsersVacationUpdate = async () => {
        if (socketsManager.engine.clientsCount) {
            try {
                const vacations = await dal.executeQueryAsync(`SELECT * FROM vacations`);
                socketsManager.sockets.emit("vacations-update", vacations);
            }
            catch (err) {
                console.log(err);
                socketsManager.sockets.emit("error", { message: "Error: server error" });
            }
        }
    };
    module.exports.allUsersVacationUpdate = allUsersVacationUpdate;

    socketsManager.sockets.on("connection", socket => {
        console.log("A client is connected");
        (async () => {
            try {
                const vacations = await dal.executeQueryAsync(`SELECT * FROM vacations`);
                socket.emit("vacations-update", vacations);
            }
            catch (err) {
                socket.emit("error", { message: "Error: server error" });
            }
        })();

        socket.on("disconnect", () => {
            console.log("A client is disconnected");
        });
    })
}

function patchVacationFollowByIdAsync(id, isFollow) {
    let operator = "-";
    if (isFollow)
        operator = "+";

    return dal.executeQueryAsync(`
        UPDATE vacations SET followers = followers ${operator} "1" WHERE vacation_id = "${id}"
    `);
}

module.exports = {
    socketInit,
    patchVacationFollowByIdAsync
}