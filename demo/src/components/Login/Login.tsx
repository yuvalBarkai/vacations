import "./Login.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, updateVacatios } from "../../actions";
import config from "../../configuration.json";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import User from "../../models/User";
import { vacations } from "../../data/vacations";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /**
     * - Tries to login the user.
     * - If it is succeeded, saves the token in the localStorage,
     * dispatchs the information to Redux, connects to the socket
     * and navigates home.
     * - If it is not succeeded, shows the error. 
     * @param {LoginType} loginInfo 
     */
    const submit = () => {
        dispatch(signin(new User("Guest", "guest", "fakeToken", 5, "guest")));
        dispatch(updateVacatios(vacations));
        navigate("/home");
    }

    const admin = () => {
        dispatch(signin(new User("Admin", "admin", "fakeToken", 1, "admin")));
        dispatch(updateVacatios(vacations));
        navigate("/home");
    }
    /*  try {
         setError("");
         const success = await ServerRequests.loginAsync(loginInfo);
         LocalUserSave.newLogin(success.data.token);
         dispatch(updateChecked(success.followedVac));
         dispatch(signin(success.data));
         SocketService.connect(dispatch, success.data.token);
         navigate("/home");
     }
     catch (err) {
         const error = err as AxiosError;
         const errorMsg = (error.response?.data as { message: string }).message;
         setError(errorMsg);
     } */
    return (
        <Form className="loginForm">
            <h2>Press submit for a user or admin for admin</h2>
            <div className="grey">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username </Form.Label>
                    <Form.Control className="input username" type="text" placeholder="Username" disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="input password" type="password" placeholder="Password" disabled />
                </Form.Group>
            </div>
            <Button variant="primary" type="button" size="lg" onClick={submit}>
                Submit
            </Button>
            <Button variant="primary" type="button" size="lg" onClick={admin}>
                Admin
            </Button>
            <div className="grey">
                Create a new {config.siteName} account <span className="navlink">Register</span>
            </div>
        </Form>
    )
}

export default Login