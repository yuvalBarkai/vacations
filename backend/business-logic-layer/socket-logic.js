const dal = require("../data-access-layer/dal");
const io = require("socket.io");
const jwt = require("jsonwebtoken");
const config = require("../configuration.json");

let socketsManager;

/**
 * Initiats socket.io for every origin "*", 
 * contains a middleware that verifies it gets a proper token.   
 * 
 * @param {Server<IncomingMessage, ServerResponse>} listener 
 */
function socketInit(listener) {
    socketsManager = io(listener, { cors: { origin: "*" } });
    socketsManager.use((socket, next) => {
        const token = socket.handshake.auth.token.split(" ")[1];
        jwt.verify(token, config.jwtEncriptionKey, (err, decodedToken) => {
            if (err) {
                let errorMsg = "Unknown";
                if (err.message == "jwt expired")
                    errorMsg = "Login session is expired";
                else
                    errorMsg = "You are not logged-in";
                next(new Error(errorMsg))
            }
            else {
                next();
            }
        })
        /**
         * If there are any users, they are emited with the vacations table from the db
         * or an error if something went wrong with the mySQL query
         */
        const allUsersVacationsUpdate = async () => {
            if (socketsManager.engine.clientsCount > 0) {
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
        module.exports.allUsersVacationsUpdate = allUsersVacationsUpdate;

        socketsManager.sockets.on("connection", (socket) => {
            (async () => {
                try {
                    console.log(`Client count: ${socketsManager.engine.clientsCount}`);
                    const vacations = await dal.executeQueryAsync(`SELECT * FROM vacations`);
                    socket.emit("vacations-update", vacations);
                }
                catch (err) {
                    socket.emit("error", { message: "Error: server error" });
                }
            })();
        });

        socket.on("disconnect", () => {
            console.log(`Client count: ${socketsManager.engine.clientsCount - 1}`);
        });
    })
}

module.exports = {
    socketInit
}