import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import "./Register.css"

interface RegisterType {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
}

function Register() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterType>();
    const [result, setResult] = useState("");
    const [serverErr, setServerErr] = useState<string[]>([]);

    const submit = async (registrationData: RegisterType) => {
        try {
            setResult("");
            setServerErr([]);
            await axios.post("http://localhost:5000/public/register", registrationData);
            // swap that to automatic login and navigate("/home")
            setResult(`You have been registered, feel free to login`);
            reset();
        }
        catch (err) {
            const error = err as AxiosError;
            if (error.response?.status === 400) {
                const errList = error.response.data as { message: string }[];
                for (const e of errList)
                    setServerErr(old => { old.push(e.message); return old });
            }
            else {
                const errorMsg = (error.response?.data as { message: string })?.message;
                setResult(errorMsg);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h2>Register</h2>
            <div>
                <label>First name: </label>
                <input type="text" {...register("first_name", { required: true, minLength: 2, maxLength: 20 })} />
                {errors.first_name?.type === "required" && <span className="error">First name is missing</span>}
                {errors.first_name?.type === "minLength" && <span className="error">Must be over 1 character</span>}
                {errors.first_name?.type === "maxLength" && <span className="error">Must be under 21 characters</span>}
            </div>
            <div>
                <label>Last name: </label>
                <input type="text" {...register("last_name", { required: true, minLength: 2, maxLength: 20 })} />
                {errors.last_name?.type === "required" && <span className="error">Last name is missing</span>}
                {errors.last_name?.type === "minLength" && <span className="error">Must be over 1 character</span>}
                {errors.last_name?.type === "maxLength" && <span className="error">Must be under 21 characters</span>}
            </div>
            <div>
                <label>Username: </label>
                <input type="text" {...register("username", { required: true, minLength: 3, maxLength: 30 })} />
                {errors.username?.type === "required" && <span className="error">Username is missing</span>}
                {errors.username?.type === "minLength" && <span className="error">Must be over 2 characters</span>}
                {errors.username?.type === "maxLength" && <span className="error">Must under 31 characters</span>}
            </div>
            <div>
                <label>Password: </label>
                <input type="text" {...register("password", { required: true, minLength: 3, maxLength: 40 })} />
                {errors.password?.type === "required" && <span className="error">Password is missing</span>}
                {errors.password?.type === "minLength" && <span className="error">Must be over 2 characters</span>}
                {errors.password?.type === "maxLength" && <span className="error">Must be under 41 characters</span>}
            </div>
            <button>Register</button>
            <div>
                {result}
            </div>
            {serverErr.map(e => <div className="error">{e}</div>)}
        </form>
    )
}

export default Register