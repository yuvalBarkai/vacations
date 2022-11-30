import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../components/Login/Login"
import Register from "../components/Register/Register"
import Vacations from "../components/Vacations/Vacations"

function Routing() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Vacations />} />

            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<h3>Page not found</h3>} />
        </Routes>
    )
}
export default Routing