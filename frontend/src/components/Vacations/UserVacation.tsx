import { AxiosError } from "axios";
import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearVacations, signout, updateChecked } from "../../actions";
import ServerRequests from "../../services/ServerRequests";
import { ReduxState, VacationType } from "../../types";
import config from "../../configuration.json";
import LocalUserSave from "../../services/LocalUserSave";

function UserVacation(props: { vacation: VacationType }) {
  const v = props.vacation;
  const dispatch = useDispatch();
  const checkedVacations = useSelector((state: ReduxState) => state.checkedVacations);
  const userInfo = useSelector((state: ReduxState) => state.logged);

  const follow = async (e: SyntheticEvent) => {
    try {
      const isChecked = (e.target as HTMLInputElement).checked;
      const checkedVac = await ServerRequests.patchVacationFollowAsync(isChecked, v.vacation_id,
        userInfo.userData.token, checkedVacations);
      dispatch(updateChecked(checkedVac));
    }
    catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 403) {
        alert(config.expiredMsg);
        LocalUserSave.disconnect();
        dispatch(signout());
        dispatch(clearVacations());
      }
      else
        console.log(error);
    }
  };

  return (
    <div>
      <h2>{v.vacation_destination}</h2>
      <input type="checkbox" onChange={follow} checked={checkedVacations.includes(v.vacation_id)} />
      <div>{v.vacation_description}</div>
      <img className="image" src={`http://localhost:5000/public/images/${v.image_location}`} alt="Server Error" />
      <div>Follower Number: {v.followers}</div>
    </div>
  );
}

export default UserVacation;
