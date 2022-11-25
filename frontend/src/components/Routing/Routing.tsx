import { Route, Routes } from "react-router-dom"
import Login from "../Login/Login"
import Register from "../Register/Register"

function Routing() {
    return (
        <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            
            <Route path="/" element={<h3>HOME</h3>} />
            <Route path="*" element={<h3>Page not found</h3>} />
        </Routes>
    )
}
export default Routing