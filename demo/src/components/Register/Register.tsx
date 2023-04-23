import "./Register.scss"
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signin, updateChecked } from "../../actions";
import LocalUserSave from "../../services/LocalUserSave";
import ServerRequests from "../../services/ServerRequests";
import SocketService from "../../services/SocketService";
import { RegisterType } from "../../types";
import { Button, Form } from "react-bootstrap";

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterType>();
    const [serverErr, setServerErr] = useState<string[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /**
     * - Tries to Register the user.
     * - If it succeeds, saves the token in the localStorage,
     * dispatchs the information to Redux, connects to the socket
     * and navigates home.
     * - If it does not succeed checks the error status and shows an 
     * array of errors 
     * @param {RegisterType} registrationData 
     */
    const submit = async (registrationData: RegisterType) => {
        try {
            setServerErr([]);
            const success = await ServerRequests.registerAsync(registrationData);
            LocalUserSave.newLogin(success.data.token);
            dispatch(updateChecked(success.followedVac));
            dispatch(signin(success.data));
            SocketService.connect(dispatch, success.data.token);
            navigate("/home")
        }
        catch (err) {
            const error = err as AxiosError;
            if (error.response?.status === 400) {
                const errList = error.response.data as { message: string }[];
                for (const e of errList)
                    setServerErr(old => { old.push(e.message); return old });
            }
            else {
                const errorMsg = (error.response?.data as { message: string }).message;
                setServerErr(old => { old.push(errorMsg); return old });
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit(submit)} className="registerForm grey">
            <Form.Label className="formHead">Register</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicFirst">
                <Form.Label>First Name </Form.Label>
                <Form.Control className="input firstName" type="text" placeholder="First Name" {...register("first_name", { required: true, minLength: 2, maxLength: 20 })} />
                {errors.first_name?.type === "required" && <span className="error">First name is missing</span>}
                {errors.first_name?.type === "minLength" && <span className="error">Must be over 1 character</span>}
                {errors.first_name?.type === "maxLength" && <span className="error">Must be under 21 characters</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLast">
                <Form.Label>Last Name </Form.Label>
                <Form.Control className="input lastName" type="text" placeholder="Last Name" {...register("last_name", { required: true, minLength: 2, maxLength: 20 })} />
                {errors.last_name?.type === "required" && <span className="error">Last name is missing</span>}
                {errors.last_name?.type === "minLength" && <span className="error">Must be over 1 character</span>}
                {errors.last_name?.type === "maxLength" && <span className="error">Must be under 21 characters</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
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
                Register
            </Button>
            {serverErr.map(e => <div className="error">{e}</div>)}
            <div>
                Already have an account ? <NavLink to="/login">login</NavLink>
            </div>
        </Form>
    )
}

export default Register