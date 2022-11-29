const io = require("socket.io");
const dal = require("../data-access-layer/dal");

let socketsManager;

function socketInit(listener) {
    socketsManager = io(listener, { cors: { origin: "*" } });

    socketsManager.sockets.on("connection", socket => {
        console.log("A client is connected");
        let vacationsUpdate = async () => {
            try {
                const vacations = await dal.executeQueryAsync(`SELECT * FROM vacations`);
                socket.emit("vacations-update", vacations);
            }
            catch (error) {
                console.log(error);
                socket.emit("error", { message: "Error: server error" });
            }
        };
        vacationsUpdate();
        module.exports.vacationsUpdate = vacationsUpdate;

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