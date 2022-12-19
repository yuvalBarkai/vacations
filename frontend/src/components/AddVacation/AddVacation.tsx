import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import DateService from "../../services/DateService";
import ServerRequests from "../../services/ServerRequests";
import { AddVacationForm, ReduxState } from "../../types"
import config from "../../configuration.json";
import { clearVacations, signout } from "../../actions";
import LocalUserSave from "../../services/LocalUserSave";

function AddVacation() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddVacationForm>();
    const userInfo = useSelector((state: ReduxState) => state.logged);
    const [resultMsg, setResultMsg] = useState("");
    const [resultClass, setResultClass] = useState("");
    const dispatch = useDispatch();
    /**
     * - validates the start_date and end_date, shows the error if there are any.
     * - If the dates are valid, sends a edit vacation request to the server.
     * - If it succeeds, shows the inserted id, and resets the resultClass and the inputs.
     * - If it does not succeed, checks the error status and either disconnect the user because it
     * got 403 (Unautorized) or shows the error. 
     * @param {AddVacationForm} newVacation 
     */
    const submit = async (newVacation: AddVacationForm) => {
        try {
            const dateError = new DateService(newVacation.start_date).validateStartEnd(newVacation.end_date);
            if (dateError) {
                setResultMsg(dateError);
                setResultClass("error");
            }
            else {
                const response = await ServerRequests.postVacationAsync(newVacation, userInfo.userData.token);
                setResultClass("");
                setResultMsg(`The vacation was succesfully registered with the id ${response.insertId}`)
                reset();
            }
        } catch (err) {
            const error = err as AxiosError;
            if (error.response?.status === 403) {
                setResultMsg(config.expiredMsg);
                LocalUserSave.disconnect();
                dispatch(signout());
                dispatch(clearVacations());
            }
            else {
                setResultClass("error");
                const errorSent = error.response?.data as { message: string }[];
                setResultMsg(errorSent[0].message);
            }

        }
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h2>Add Vacation</h2>
            <div>
                <label>Description: </label>
                <textarea cols={30} rows={4} {...register("vacation_description", { required: true, minLength: 20, maxLength: 300 })}></textarea>
                {errors.vacation_description?.type === "required" && <span className="error">Missing Description</span>}
                {errors.vacation_description?.type === "minLength" && <span className="error">Must have 20 characters or more</span>}
                {errors.vacation_description?.type === "maxLength" && <span className="error">Must have 300 characters or less</span>}
            </div>
            <div>
                <label>Vacation's destination: </label>
                <input type="text" {...register("vacation_destination", { required: true, minLength: 2, maxLength: 40 })} />
                {errors.vacation_destination?.type === "required" && <span className="error">Missing Destination</span>}
                {errors.vacation_destination?.type === "minLength" && <span className="error">Must have 2 characters or more</span>}
                {errors.vacation_destination?.type === "maxLength" && <span className="error">Must have 40 characters or less</span>}
            </div>
            <div>
                <label>Image: </label>
                <input type="file" {...register("image", { required: true })} />
                {errors.image?.type === "required" && <span className="error">Missing Image</span>}
            </div>
            <div>
                <label>Price: </label>
                <input type="number" {...register("price", { required: true, min: 0 })} />
                {errors.price?.type === "required" && <span className="error">Missing Price</span>}
                {errors.price?.type === "min" && <span className="error">Must be positive</span>}
            </div>
            <div>
                <label>Start Date: </label>
                <input type="date" {...register("start_date", { required: true })} />
                {errors.start_date?.type === "required" && <span className="error">Missing Start Date</span>}
            </div>
            <div>
                <label>End Date: </label>
                <input type="date" {...register("end_date", { required: true })} />
                {errors.end_date?.type === "required" && <span className="error">Missing End Date</span>}
            </div>
            <div className={resultClass}>
                {resultMsg}
            </div>
            <button>Submit</button>
        </form>
    )
}

export default AddVacation