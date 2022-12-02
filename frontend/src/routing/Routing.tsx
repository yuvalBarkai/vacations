import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import AddVacation from "../components/AddVacation/AddVacation"
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
                <Route path="/addVacation" element={<AddVacation />} />
            }
            
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}
export default Routing