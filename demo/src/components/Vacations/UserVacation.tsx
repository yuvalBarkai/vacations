import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alterVacation, checkVacation, unCheckVacation } from "../../actions";
import { ReduxState, VacationType } from "../../types";
import { Card, Col, ListGroup } from "react-bootstrap";

function UserVacation(props: { vacation: VacationType }) {
  const v = props.vacation;
  const dispatch = useDispatch();
  const checkedVacations = useSelector((state: ReduxState) => state.checkedVacations);
  /**
   * - Checks if the checkbox is checked or unchecked.
   * - Updates the checkedVac array in Redux.
   * - Updates the original array as well 
   * @param {SyntheticEvent} e 
   */
  const follow = async (e: SyntheticEvent) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    const vacation = {...v};
    if (isChecked) {
      dispatch(checkVacation(v.vacation_id));
      vacation.followers++;
      dispatch(alterVacation(vacation));
    } 
    else {
      dispatch(unCheckVacation(v.vacation_id));
      vacation.followers--;
      dispatch(alterVacation(vacation));
    }

    dispatch(alterVacation(v))
  };

  return (
    <Col lg={4} md={6}>
      <Card className="userCard">
        <label htmlFor={`input-${v.vacation_id}`}>
          <Card.Img src={`/images/${v.image_location}`} className="image" />
        </label>
        <div className="follow">
          <label htmlFor={`input-${v.vacation_id}`}>Follow: </label>
          <input type="checkbox" id={`input-${v.vacation_id}`} onChange={follow} checked={checkedVacations.includes(v.vacation_id)} />
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
