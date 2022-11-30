import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { updateVacatios } from "../../actions";
import { VacationType } from "../../types/types";
import "./Login.css"

function Login() {
    let socket: Socket | undefined;

    const connect = () => {
        socket = io("http://localhost:5000");
        socket.on("vacations-update", vacations => {
            console.log(vacations);
            dispatch(updateVacatios(vacations));
        });
    }

    const vacations = useSelector((state: any) => state.vacations as VacationType[]);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Login</h2>

            <button onClick={connect}>Connect</button>
            <div>
                {vacations.map(v => <div key={v.vacation_id}>{v.vacation_id} -- {v.vacation_destination}</div>)}
            </div>
        </div>
    )
}

export default Login