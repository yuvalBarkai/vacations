import { io, Socket } from "socket.io-client";
import "./Login.css"

function Login() {
    let socket: Socket | undefined;

    const connect = () => {
        socket = io("http://localhost:5000");
        socket.on("vacations-update", vacations => {
            console.log(vacations);
        });
    }

    return (
        <div>
            <h2>Login</h2>

            <button onClick={connect}>Connect</button>
        </div>
    )
}

export default Login