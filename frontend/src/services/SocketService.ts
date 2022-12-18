import { io, Socket } from "socket.io-client";
import { clearVacations, signout, updateVacatios } from "../actions";
import { VacationType } from "../types";
import LocalUserSave from "./LocalUserSave";

class SocketService {
    static socket: Socket | undefined;

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

    static disconnect() {
        SocketService.socket?.disconnect();
    }
}

export default SocketService
