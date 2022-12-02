import { useForm } from "react-hook-form"
import { AddVacationForm } from "../../types"

function AddVacation() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddVacationForm>();

    return (
        <form>
            <h2>Add Vacation</h2>
            <div>
                <label>Description: </label>
                <textarea cols={30} rows={10} {...register("vacation_description", { required: true, minLength: 20, maxLength: 300 })}></textarea>
            </div>
            <div>
                <label>Vacation's destination: </label>
                <input type="text" {...register("vacation_destination", { required: true, minLength: 20, maxLength: 300 })} />
            </div>
            <div>
                <label>Image: </label>
                <input type="file" {...register("image", { required: true })} />
            </div>
            <div>
                <label>Price: </label>
                <input type="number" {...register("price", { required: true, min: 0 })} />
            </div>
            <div>
                <label>Start Date: </label>
                <input type="date" {...register("start_date", { required: true })} />
            </div>
            <div>
                
            </div>
        </form>
    )
}

export default AddVacation