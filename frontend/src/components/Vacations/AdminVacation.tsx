import axios from "axios";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ReduxState, VacationType } from "../../types"

function AdminVacation(props: { vacation: VacationType }) {
    const v = props.vacation;
    const userInfo = useSelector((state: ReduxState) => state.logged);
    const deleteVacation = async () => {
        try {
            await axios.delete(`http://localhost:5000/admin/vacations/${v.vacation_id}`,
                { headers: { Authorization: `bearer ${userInfo.userData.token}` } });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <NavLink to={`/editVacation/${v.vacation_id}`}>Edit</NavLink>
            <button onClick={deleteVacation}>DELETE</button>
            <h2>{v.vacation_destination}</h2>
            <div>{v.vacation_description}</div>
            <img className="image" src={`http://localhost:5000/public/images/${v.image_location}`} alt="Server Error" />
            <div>Follower Number: {v.followers}</div>
        </div>
    )
}

export default AdminVacation