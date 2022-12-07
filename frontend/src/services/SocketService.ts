import { io, Socket } from "socket.io-client";
import { clearVacations, signout, updateVacatios } from "../actions";
import { VacationType } from "../types";

class SocketService {
    socket: Socket | undefined;

    connect(dispatch: (action: { type: string, data: VacationType[] }) => void) {
        this.socket = io("http://localhost:5000");
        this.socket.on("vacations-update", vacations => {
            dispatch(updateVacatios(vacations));
        });
        this.socket.on("error", (error) => {
            console.log(error);
        });
    }
    disconnect(dispatch:(action: { type: string }) => void){
        this.socket?.disconnect();
        dispatch(clearVacations());
        dispatch(signout())
    }
}

// consider moving this part to a provider and updating the uses
const currentSocket = new SocketService();
export default currentSocket
