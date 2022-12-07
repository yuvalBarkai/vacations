import axios from "axios";
import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checked, unChecked, updateVacatios } from "../../actions";
import { ReduxState, VacationType } from "../../types";

function UserVacation(props: { vacation: VacationType }) {
  const v = props.vacation;
  const dispatch = useDispatch();
  const vacations = useSelector((state: ReduxState) => state.vacations);
  const checkedVacations = useSelector(
    (state: ReduxState) => state.checkedVacations
  );
  const userInfo = useSelector((state: ReduxState) => state.logged);

  const follow = async (e: SyntheticEvent) => {
    try {
      const isChecked = (e.target as HTMLInputElement).checked;
      const checkedVac = [...checkedVacations];
      const list = [...vacations];
      await axios.patch( // consider declaring for the user that he follows this vacation
        `http://localhost:5000/medium/follow/${v.vacation_id}`,
        { isFollow: isChecked },
        { headers: { Authorization: `bearer ${userInfo.userData.token}` } }
      );

      if (isChecked) {
        dispatch(checked(v.vacation_id));
        checkedVac.push(v.vacation_id);
      } else {
        dispatch(unChecked(v.vacation_id));
        checkedVac.splice(checkedVac.indexOf(v.vacation_id), 1);
      }
      // sorting vacations by having the vacations in checkVac first
      dispatch(updateVacatios(list.sort((a, b) => {
        return checkedVac.includes(a.vacation_id) &&
          checkedVac.includes(b.vacation_id) ? 0 : checkedVac.includes(a.vacation_id) ? -1 : 1;
      })));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>{v.vacation_destination}</h2>
      <input type="checkbox" onChange={follow} />
      <div>{v.vacation_description}</div>
      <img className="image" src={`http://localhost:5000/public/images/${v.image_location}`} alt="Server Error"/>
    </div>
  );
}

export default UserVacation;
