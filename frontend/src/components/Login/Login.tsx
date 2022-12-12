import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { signin, updateChecked } from "../../actions";
import SocketService from "../../services/SocketService";
import { UserType } from "../../types";
import "./Login.css";
import configuration from "../../configuration.json";

interface loginType {
    username: string;
    password: string;
}

function Login() {

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<loginType>();
    const [result, setResult] = useState("");
    const navigate = useNavigate();

    const submit = async (loginInfo: loginType) => {
        try {
            setResult("");
            const response = await axios.post<UserType>("http://localhost:5000/auth/login", loginInfo);
            const followedVac = await axios.get<{ vacation_id: number }[]>(`http://localhost:5000/medium/followed/${response.data.user_id}`,
                { headers: { Authorization: `bearer ${response.data.token}` } });
            dispatch(updateChecked(followedVac.data.map(f => f.vacation_id)));
            dispatch(signin(response.data));
            SocketService.connect(dispatch);
            localStorage.removeItem(configuration.localStorageObjName);
            const expTime = new Date();
            expTime.setMinutes(expTime.getMinutes() + configuration.userSaveLocalStorageExpTime);
            const savedInfo = { ...response.data }
            savedInfo.expirationTime = expTime;
            localStorage.setItem(configuration.localStorageObjName, JSON.stringify(savedInfo));
            navigate("/home");
        }
        catch (err) {
            const error = err as AxiosError;
            const errorMsg = (error.response?.data as { message: string })?.message;
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