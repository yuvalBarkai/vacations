import { io, Socket } from "socket.io-client";
import { clearVacations, signout, updateVacatios } from "../actions";
import { VacationType } from "../types";
import LocalUserSave from "./LocalUserSave";

class SocketService {
    static socket: Socket | undefined;
    /**
     * - Connects to the server's socket.
     * - Handles the events: "vacations-update", "error", "connect_error"
     * 
     * @param dispatch - The dispatch functions that will allow
     * The socket event "vacations-update" to update Redux.
     * @param token - The user's Token that will allows the client
     * to connect to the server with socket.
     */
    static connect(dispatch: (action: { type: string, data?: VacationType[] }) => void, token: string) {
        SocketService.socket = io("http://localhost:5000", { auth: { token: `bearer ${token}` } });
        SocketService.socket.on("vacations-update", vacations => {
            dispatch(updateVacatios(vacations));
        });
        SocketService.socket.on("error", (error) => {
            console.log(error);
        });
        SocketService.socket.on("connect_error", (error) => {
            LocalUserSave.disconnect();
            dispatch(signout());
            dispatch(clearVacations());
            alert(error.message);
        })
    }
    /**
     * Activates The socket's disconnect function
     * that disconnects from the server's socket.
     */
    static disconnect() {
        SocketService.socket?.disconnect();
    }
}

export default SocketService
