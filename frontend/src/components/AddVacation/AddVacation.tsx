import axios from "axios";
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import { AddVacationForm, ReduxState } from "../../types"

function AddVacation() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddVacationForm>();
    const userInfo = useSelector((state: ReduxState) => state.logged);

    const submit = async (newVacation: AddVacationForm) => {
        try {
            const formData = new FormData(); 
            // didnt work with a loop because typescript was complaining..
            formData.append("vacation_description", newVacation.vacation_description);
            formData.append("vacation_destination", newVacation.vacation_destination);
            formData.append("image", newVacation.image[0]);
            formData.append("start_date", newVacation.start_date);
            formData.append("end_date", newVacation.end_date);
            formData.append("price", String(newVacation.price));

            const response = await axios.post(`http://localhost:5000/admin/vacations`, formData,
                { headers: { Authorization: `bearer ${userInfo.userData.token}` } });
            console.log(response);
            reset();
        } catch (error) {
            console.log(error);
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
            <div>

            </div>
            <button>Submit</button>
        </form>
    )
}

export default AddVacation