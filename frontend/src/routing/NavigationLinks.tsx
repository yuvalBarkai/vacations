import "./NavigationLinks.scss"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SocketService from "../services/SocketService";
import { ReduxState } from "../types";
import config from "../configuration.json"
import { clearVacations, signout } from "../actions";
import { Button, Container, Navbar } from "react-bootstrap";

function NavigationLinks() {
    const userInfo = useSelector((state: ReduxState) => state.logged);
    const dispatch = useDispatch();

    return (
        <Navbar bg="light" expand="md" className="py-5">
            <Container>
                <Navbar.Brand as={NavLink} to="/home" className="vacationsLink">{config.siteName}</Navbar.Brand>
                <Navbar.Toggle />
                {userInfo.isAdmin &&
                    <Navbar.Brand as={NavLink} to="/addVacation" className="addLink">Add Vacation</Navbar.Brand>}
                {userInfo.isAdmin &&
                    <Navbar.Brand as={NavLink} to="/followStats" className="statsLink">Follow statistics</Navbar.Brand>}
                <Navbar.Collapse className="justify-content-end">

                    {userInfo.isLogged ?
                        <div>
                            <Navbar.Text className="firstName">
                                Signed in as: {userInfo.userData.first_name}
                            </Navbar.Text>
                            <Button variant="secondary" className="logoutBtn" onClick={() => {
                                SocketService.disconnect();
                                localStorage.removeItem(config.localStorageSaveName);
                                dispatch(clearVacations());
                                dispatch(signout());
                            }}>
                                Logout
                            </Button>
                        </div>
                        : <Navbar.Brand as={NavLink} to="/login" className="loginBtn">Login</Navbar.Brand>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationLinks