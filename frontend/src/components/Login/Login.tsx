import "./Login.css";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginType } from "../../types";
import ServerRequests from "../../services/ServerRequests";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<loginType>();
    const [result, setResult] = useState("");
    
    const submit = async (loginInfo: loginType) => {
        try {
            setResult("");
            await ServerRequests.loginAsync(loginInfo, dispatch);
            navigate("/home");
        }
        catch (err) {
            const error = err as AxiosError;
            const errorMsg = (error.response?.data as { message: string }).message;
            setResult(errorMsg);
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h2>Login</h2>
            <div className="usernameArea">
                <label>username: </label>
                <input type="text" {...register("username", { required: true, minLength: 3, maxLength: 30 })} autoFocus={true} />
                {errors.username?.type === "required" && <span className="error"> Missing username </span>}
                {errors.username?.type === "maxLength" && <span className="error"> Must be under 30 characters </span>}
                {errors.username?.type === "minLength" && <span className="error"> Must be over 2 characters </span>}
            </div>
            <div className="passwordArea">
                <label>password: </label>
                <input type="password" {...register("password", { required: true, minLength: 3, maxLength: 40 })} />
                {errors.password?.type === "required" && <span className="error"> Missing password </span>}
                {errors.password?.type === "maxLength" && <span className="error"> Must be under 40 characters </span>}
                {errors.password?.type === "minLength" && <span className="error"> Must be over 2 characters </span>}
            </div>
            <button>Login</button>
            <div>
                {result}
            </div>
            <div>
                <NavLink to="/register">Register</NavLink>
            </div>
        </form>
    )
}

export default Login