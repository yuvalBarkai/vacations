import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ServerRequests from "../../services/ServerRequests";
import { ReduxState, VacationType } from "../../types"
import config from "../../configuration.json";
import { clearVacations, signout } from "../../actions";
import LocalUserSave from "../../services/LocalUserSave";

function AdminVacation(props: { vacation: VacationType }) {
    const v = props.vacation;
    const userInfo = useSelector((state: ReduxState) => state.logged);
    const dispatch = useDispatch();

    const deleteVacation = async () => {
        try {
            await ServerRequests.deleteVacationAsync(v.vacation_id, userInfo.userData.token);
        }
        catch (err) {
            const error = err as AxiosError
            if (error.response?.status === 403) {
                alert(config.expiredMsg);
                LocalUserSave.disconnect();
                dispatch(signout());
                dispatch(clearVacations());
            }
            else
                console.log(error.response?.data);
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