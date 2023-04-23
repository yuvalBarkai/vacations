import "./AddVacation.scss";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import DateService from "../../services/DateService";
import { AddVacationForm, ReduxState } from "../../types"
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { newVacation } from "../../actions";

function AddVacation() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddVacationForm>();
    const vacations = useSelector((state: ReduxState) => state.vacations);
    const [resultMsg, setResultMsg] = useState("");
    const [resultClass, setResultClass] = useState("");
    const dispatch = useDispatch();
    /**
     * - validates the start_date and end_date, shows the error if there are any.
     * - If the dates are valid, sends a edit vacation request to the server.
     * - If it succeeds, shows the inserted id, and resets the resultClass and the inputs.
     * - If it does not succeed, checks the error status and either disconnect the user because it
     * got 403 (Unautorized) or shows the error. 
     * @param {AddVacationForm} newVacationFields 
     */
    const submit = (newVacationFields: AddVacationForm) => {
        const dateError = new DateService(newVacationFields.start_date).validateStartEnd(newVacationFields.end_date);
        if (dateError) {
            setResultMsg(dateError);
            setResultClass("error");
        }
        else {
            newVacationFields.vacation_id = vacations.length;
            newVacationFields.followers = 0;
            newVacationFields.image_location = "notFoundTemplate.png";
            dispatch(newVacation(newVacationFields));
            setResultClass("");
            setResultMsg(`The vacation was succesfully registered with the id ${vacations.length}`);
            reset();
        }
    }

    return (
        <Form onSubmit={handleSubmit(submit)} className="addVacationForm">
            <Form.Group className="mb-3">
                <Form.Label>Destination</Form.Label>
                <Form.Control className="input destination" type="text" placeholder="Destination" {...register("vacation_destination", { required: true, minLength: 2, maxLength: 40 })} />
                {errors.vacation_destination?.type === "required" && <span className="error">Missing Destination</span>}
                {errors.vacation_destination?.type === "minLength" && <span className="error">Must have 2 characters or more</span>}
                {errors.vacation_destination?.type === "maxLength" && <span className="error">Must have 40 characters or less</span>}
            </Form.Group>
            <FloatingLabel controlId="floatingTextarea" label="Vacation Description" className="input description">
                <Form.Control
                    as="textarea"
                    style={{ height: '125px', fontSize: "25px" }}
                    {...register("vacation_description", { required: true, minLength: 20, maxLength: 300 })}
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
                <Form.Control className="input price" type="number" {...register("price", { required: true, min: 0 })} />
                {errors.price?.type === "required" && <span className="error">Missing Price</span>}
                {errors.price?.type === "min" && <span className="error">Must be positive</span>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control className="input start_date" type="date" {...register("start_date", { required: true })} />
                {errors.start_date?.type === "required" && <span className="error">Missing Start Date</span>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control className="input end_date" type="date" {...register("end_date", { required: true })} />
                {errors.end_date?.type === "required" && <span className="error">Missing End Date</span>}
            </Form.Group>
            <div className={resultClass}>
                {resultMsg}
            </div>
            <Button variant="primary" type="submit" size="lg">
                Submit
            </Button>
        </Form>
    )
}

export default AddVacation