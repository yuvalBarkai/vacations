import { VacationType } from "../../types"

function AdminVacation(props: { vacation: VacationType }) {
    const v = props.vacation;
    return (
        <div>
            <h1>ADMIN</h1>
            <h2>{v.vacation_destination}</h2>
            <div>{v.vacation_description}</div>
            {v.image_location}
        </div>
    )
}

export default AdminVacation