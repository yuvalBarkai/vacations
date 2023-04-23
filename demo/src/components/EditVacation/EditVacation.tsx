import "./EditVacation.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import DateService from "../../services/DateService";
import { AddVacationForm, ReduxState } from "../../types";
import { alterVacation } from "../../actions";
import { Button, FloatingLabel, Form } from "react-bootstrap";

function EditVacation() {
    const { register, handleSubmit, formState: { errors } } = useForm<AddVacationForm>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setErrorMsg] = useState("");

    const vacationId = useParams().id;
    const vacations = useSelector((state: ReduxState) => state.vacations);
    const vacationToEdit = vacations.find(v => String(v.vacation_id) === vacationId);
    /**
     * - validates the start_date and end_date, shows the error if there are any.
     * - If the dates are valid, sends a edit vacation request to the server.
     * - If it succeeds, navigates "/home".
     * - If it does not succeed, checks the error status and either disconnect the user because it
     * got 403 (Unautorized) or shows the error. 
     * @param {AddVacationForm} newVacation 
     */
    const submit = async (newVacationFields: AddVacationForm) => {
        /* const dateError = new DateService(newVacationFields.start_date).validateStartEnd(newVacationFields.end_date);
        if (dateError) {
            setErrorMsg(dateError);
        }
        else */ 
        if (vacationId) {
            newVacationFields.vacation_id = +vacationId;
            dispatch(alterVacation(newVacationFields));
            navigate("/home");
        }
    }

    return (
        <Form onSubmit={handleSubmit(submit)} className="editVacationForm">
            <Form.Group className="mb-3">
                <Form.Label>Destination</Form.Label>
                <Form.Control className="input destination" defaultValue={vacationToEdit?.vacation_destination} type="text" placeholder="Destination" {...register("vacation_destination", { required: true, minLength: 2, maxLength: 40 })} />
                {errors.vacation_destination?.type === "required" && <span className="error">Missing Destination</span>}
                {errors.vacation_destination?.type === "minLength" && <span className="error">Must have 2 characters or more</span>}
                {errors.vacation_destination?.type === "maxLength" && <span className="error">Must have 40 characters or less</span>}
            </Form.Group>
            <FloatingLabel controlId="floatingTextarea" label="Vacation Description" className="input description">
                <Form.Control
                    as="textarea"
                    style={{ height: '125px', fontSize: "25px" }}
                    {...register("vacation_description", { required: true, minLength: 20, maxLength: 300 })}
                    defaultValue={vacationToEdit?.vacation_description}
                />
            </FloatingLabel>
            {errors.vacation_description?.type === "required" && <span className="error">Missing Description</span>}
            {errors.vacation_description?.type === "minLength" && <span className="error">Must have 20 characters or more</span>}
            {errors.vacation_description?.type === "maxLength" && <span className="error">Must have 300 characters or less</span>}
            <Form.Group className="mb-3 grey">
                <Form.Label>Image</Form.Label>
                <Form.Control className="input image" type="file" disabled />
                <span>disabled due to demo capabilities</span>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control className="input price" defaultValue={vacationToEdit?.price} type="number" {...register("price", { required: true, min: 0 })} />
                {errors.price?.type === "required" && <span className="error">Missing Price</span>}
                {errors.price?.type === "min" && <span className="error">Must be positive</span>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control className="input start_date" type="date" defaultValue={vacationToEdit?.start_date && new DateService(vacationToEdit?.start_date).toYYYYMMDD()} {...register("start_date", { required: true })} />
                {errors.start_date?.type === "required" && <span className="error">Missing Start Date</span>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control className="input end_date" type="date" defaultValue={vacationToEdit?.end_date && new DateService(vacationToEdit?.end_date).toYYYYMMDD()} {...register("end_date", { required: true })} />
                {errors.end_date?.type === "required" && <span className="error">Missing End Date</span>}
            </Form.Group>
            <div className="error">
                {error}
            </div>
            <Button variant="primary" type="submit" size="lg">
                Submit
            </Button>
        </Form>

    )
}

export default EditVacation