import { AxiosError } from "axios";
import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearVacations, signout, updateChecked } from "../../actions";
import ServerRequests from "../../services/ServerRequests";
import { ReduxState, VacationType } from "../../types";
import config from "../../configuration.json";
import LocalUserSave from "../../services/LocalUserSave";
import { Card, Col, ListGroup } from "react-bootstrap";

function UserVacation(props: { vacation: VacationType }) {
  const v = props.vacation;
  const dispatch = useDispatch();
  const checkedVacations = useSelector((state: ReduxState) => state.checkedVacations);
  const userInfo = useSelector((state: ReduxState) => state.logged);
  /**
   * - Checks if the checkbox is checked or unchecked.
   * - sends the information to the ServerRequests.patchVacationFollowAsync function
   * - If it succeded updates the checkedVac array in Redux.
   * If it does not succeed, checks the error status and either disconnect the user because it
   * got 403 (Unautorized) or console.logs the error for other error.
   * @param {SyntheticEvent} e 
   */
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
    <Col lg={4} md={6}>
      <Card className="userCard">
        <Card.Img src={`http://localhost:5000/public/images/${v.image_location}`} className="image" />
        <div className="follow">
          <label htmlFor="">Follow: </label>
          <input type="checkbox" onChange={follow} checked={checkedVacations.includes(v.vacation_id)} />
        </div>
        <Card.Body>
          <Card.Title className="destination">{v.vacation_destination}</Card.Title>
          <Card.Text>
            {v.vacation_description}
          </Card.Text>
        </Card.Body>
        <Card.Text className="price">{v.price}$</Card.Text>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Start Date: {new Date(v.start_date).toLocaleString("en-GB").substring(0, 10)}</ListGroup.Item>
          <ListGroup.Item>End Date: {new Date(v.end_date).toLocaleString("en-GB").substring(0, 10)}</ListGroup.Item>
          <ListGroup.Item>{v.followers} Users are following this vacation</ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
}

export default UserVacation;
