import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import AddVacation from "../components/AddVacation/AddVacation"
import EditVacation from "../components/EditVacation/EditVacation"
import FollowStats from "../components/FollowStats/FollowStats"
import Login from "../components/Login/Login"
import Register from "../components/Register/Register"
import Vacations from "../components/Vacations/Vacations"
import { ReduxState } from "../types"

function Routing() {
    const userInfo = useSelector((state: ReduxState) => state.logged);
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Vacations />} />
            {userInfo.isAdmin &&
                <Route path="/addVacation" element={<AddVacation />} />}
            {userInfo.isAdmin &&
                <Route path="/editVacation/:id" element={<EditVacation />} />}
            {userInfo.isAdmin &&
                <Route path="/followStats" element={<FollowStats />} />}
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}
export default Routing