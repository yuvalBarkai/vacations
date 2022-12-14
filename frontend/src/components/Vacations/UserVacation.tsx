import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServerRequests from "../../services/ServerRequests";
import { ReduxState, VacationType } from "../../types";

function UserVacation(props: { vacation: VacationType }) {
  const v = props.vacation;
  const dispatch = useDispatch();
  const checkedVacations = useSelector((state: ReduxState) => state.checkedVacations);
  const userInfo = useSelector((state: ReduxState) => state.logged);

  const follow = async (e: SyntheticEvent) => {
    try {
      const isChecked = (e.target as HTMLInputElement).checked;
      await ServerRequests.patchVacationFollowAsync(isChecked, v.vacation_id,
        userInfo.userData.user_id, userInfo.userData.token, checkedVacations, dispatch);
    }
    catch (err) {
      console.log(err);
    }
  };
  // check the checked, The sort has bugs
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
