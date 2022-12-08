import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SocketService from "../services/SocketService";
import { ReduxState } from "../types";

function NavigationLinks() {
    const userInfo = useSelector((state: ReduxState) => state.logged);
    const dispatch = useDispatch();

    return (
        <>
            {userInfo.isLogged ?
                <div>Hi {userInfo.userData.first_name} <button onClick={() => { SocketService.disconnect(dispatch) }}>Sign out</button></div>
                : <NavLink to="/login">Login</NavLink>}
            &nbsp;&nbsp;
            {userInfo.isAdmin &&
                <NavLink to="/addVacation">Add Vacation</NavLink>} &nbsp;&nbsp;
            {userInfo.isAdmin &&
                <NavLink to="/followStats">Follow Statistics</NavLink>} &nbsp;&nbsp;
        </>
    )
}

export default NavigationLinks