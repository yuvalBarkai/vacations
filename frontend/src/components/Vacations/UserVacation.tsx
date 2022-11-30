import { VacationType } from "../../types"

function UserVacation(props: { vacation: VacationType }) {
    const v = props.vacation;
    return (
        <div>
            <h2>{v.vacation_destination}</h2>
            <div>{v.vacation_description}</div>
            {v.image_location}
        </div>
    )
}

export default UserVacation