import axios from "axios";
import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checked, sortVacactions, unChecked } from "../../actions";
import { ReduxState, VacationType } from "../../types";

function UserVacation(props: { vacation: VacationType }) {
  const v = props.vacation;
  const dispatch = useDispatch();
  const checkedVacations = useSelector((state: ReduxState) => state.checkedVacations);
  const userInfo = useSelector((state: ReduxState) => state.logged);

  const follow = async (e: SyntheticEvent) => {
    try {
      const isChecked = (e.target as HTMLInputElement).checked;
      const checkedVac = [...checkedVacations];
      await axios.patch(
        `http://localhost:5000/medium/follow/${v.vacation_id}`,
        { isFollow: isChecked },
        { headers: { Authorization: `bearer ${userInfo.userData.token}` } }
      );
      // consider declaring for the user that he follows this vacation
      if (isChecked) {
        dispatch(checked(v.vacation_id));
        checkedVac.push(v.vacation_id);
      } else {
        dispatch(unChecked(v.vacation_id));
        checkedVac.splice(checkedVac.indexOf(v.vacation_id), 1);
      }
      dispatch(sortVacactions(checkedVac));
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
