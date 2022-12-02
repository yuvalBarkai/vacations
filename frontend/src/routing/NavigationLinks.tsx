import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ReduxState } from "../types";

function NavigationLinks() {
    const userInfo = useSelector((state: ReduxState) => state.logged);

    return (
        <>
            <NavLink to="/login">Login</NavLink> &nbsp;&nbsp;
            {userInfo.isAdmin &&
            <NavLink to="/addVacation">Add Vacation</NavLink>}
        </>
    )
}

export default NavigationLinks