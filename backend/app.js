const express = require("express");
const cors = require("cors");

const config = require("./configuration.json");
const publicController = require("./controllers-layer/public-controller");
const authController = require("./controllers-layer/auth-controller");
const mediumController = require("./controllers-layer/medium-controller");
const adminController = require("./controllers-layer/admin-controller");

const app = express();
app.use(cors());
app.use(express.json());

const listener = app.listen(config.appPort, () => {
    console.log(`Listening at ${config.appPort}`);
}).on("error", (err) => {
    if (err.code == "EADDRINUSE")
        console.log(`Error: The port ${config.appPort} is taken`);
    else
        console.log(`Error: Unknown Error`);
});

const { socketInit } = require("./business-logic-layer/socket-logic");
socketInit(listener);

app.use("/public", publicController);
app.use("/auth", authController);
app.use("/medium", mediumController);
app.use("/admin", adminController);

app.use("*", (req, res) => {
    res.send(`Route not found ${req.originalUrl}`);
});