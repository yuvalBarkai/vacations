import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import DateService from "../../services/DateService";
import ServerRequests from "../../services/ServerRequests";
import { AddVacationForm, ReduxState } from "../../types"

function EditVacation() {
    const { register, handleSubmit, formState: { errors } } = useForm<AddVacationForm>();
    const navigate = useNavigate();
    const userInfo = useSelector((state: ReduxState) => state.logged);
    const [error, setErrorMsg] = useState("");

    const vacationId = useParams().id;
    const vacations = useSelector((state: ReduxState) => state.vacations);
    const vacationToEdit = vacations.find(v => String(v.vacation_id) === vacationId);

    const submit = async (newVacation: AddVacationForm) => {
        try {
            const dateError = new DateService(newVacation.start_date).validateStartEnd(newVacation.end_date);
            if (dateError) {
                setErrorMsg(dateError);
            }
            else if (vacationId) {
                await ServerRequests.editVacationAsync(vacationId, newVacation, userInfo.userData.token);
                navigate("/home");
            }
        } catch (err) {
            const error = err as AxiosError;
            if (error.status === 403) {
                setErrorMsg("Your login session is expired, please reconnect");
            }
            else {
                const errorSent = error.response?.data as { message: string }[]
                setErrorMsg(errorSent[0].message);
            }

        }
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h2>Edit Vacation No. {vacationId}</h2>
            <div>
                <label>Description: </label>
                <textarea cols={30} rows={4} defaultValue={vacationToEdit?.vacation_description} {...register("vacation_description", { required: true, minLength: 20, maxLength: 300 })}></textarea>
                {errors.vacation_description?.type === "required" && <span className="error">Missing Description</span>}
                {errors.vacation_description?.type === "minLength" && <span className="error">Must have 20 characters or more</span>}
                {errors.vacation_description?.type === "maxLength" && <span className="error">Must have 300 characters or less</span>}
            </div>
            <div>
                <label>Vacation's destination: </label>
                <input type="text" defaultValue={vacationToEdit?.vacation_destination} {...register("vacation_destination", { required: true, minLength: 2, maxLength: 40 })} />
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
                <input type="number" defaultValue={vacationToEdit?.price} {...register("price", { required: true, min: 0 })} />
                {errors.price?.type === "required" && <span className="error">Missing name</span>}
                {errors.price?.type === "min" && <span className="error">Must be positive</span>}
            </div>
            <div>
                <label>Start Date: </label>
                <input type="date" defaultValue={vacationToEdit?.start_date && new DateService(vacationToEdit.start_date).toYYYYMMDD()} {...register("start_date", { required: true })} />
                {errors.start_date?.type === "required" && <span className="error">Missing Start Date</span>}
            </div>
            <div>
                <label>End Date: </label>
                <input type="date" defaultValue={vacationToEdit?.end_date && new DateService(vacationToEdit.end_date).toYYYYMMDD()} {...register("end_date", { required: true })} />
                {errors.end_date?.type === "required" && <span className="error">Missing End Date</span>}
            </div>
            <div className="error">
                {error}
            </div>
            <button>Submit</button>
        </form>
    )
}

export default EditVacation