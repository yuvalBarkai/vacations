import { io, Socket } from "socket.io-client";
import { clearVacations, signout, updateVacatios } from "../actions";
import { VacationType } from "../types";

class SocketService {
    static socket: Socket | undefined;

    static connect(dispatch: (action: { type: string, data: VacationType[] }) => void) {
        SocketService.socket = io("http://localhost:5000");
        SocketService.socket.on("vacations-update", vacations => {
            dispatch(updateVacatios(vacations));
        });
        SocketService.socket.on("error", (error) => {
            console.log(error);
        });
    }
    static disconnect(dispatch:(action: { type: string }) => void){
        SocketService.socket?.disconnect();
        dispatch(clearVacations());
        dispatch(signout())
    }
}

// const currentSocket = new SocketService();
export default SocketService
