import "./Login.scss";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginType } from "../../types";
import ServerRequests from "../../services/ServerRequests";
import SocketService from "../../services/SocketService";
import { signin, updateChecked } from "../../actions";
import LocalUserSave from "../../services/LocalUserSave";
import config from "../../configuration.json";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginType>();
    const [error, setError] = useState("");
    /**
     * - Tries to login the user.
     * - If it is succeeded, saves the token in the localStorage,
     * dispatchs the information to Redux, connects to the socket
     * and navigates home.
     * - If it is not succeeded, shows the error. 
     * @param {LoginType} loginInfo 
     */
    const submit = async (loginInfo: LoginType) => {
        try {
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
        }
    }

    return (
        <Form onSubmit={handleSubmit(submit)} className="loginForm">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username </Form.Label>
                <Form.Control className="input username" type="text" placeholder="Username" {...register("username", { required: true, minLength: 3, maxLength: 30 })} />
                {errors.username?.type === "required" && <span className="error"> Missing username </span>}
                {errors.username?.type === "maxLength" && <span className="error"> Must be under 30 characters </span>}
                {errors.username?.type === "minLength" && <span className="error"> Must be over 2 characters </span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control className="input password" type="password" placeholder="Password" {...register("password", { required: true, minLength: 3, maxLength: 40 })} />
                {errors.password?.type === "required" && <span className="error"> Missing password </span>}
                {errors.password?.type === "maxLength" && <span className="error"> Must be under 40 characters </span>}
                {errors.password?.type === "minLength" && <span className="error"> Must be over 2 characters </span>}
            </Form.Group>
            <Button variant="primary" type="submit" size="lg">
                Submit
            </Button>
            <div className="error">
                {error}
            </div>
            <div>
                Create a new {config.siteName} account <NavLink to="/register">Register</NavLink>
            </div>
        </Form>
    )
}

export default Login