import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ServerRequests from "../../services/ServerRequests";
import { ReduxState, VacationType } from "../../types"
import config from "../../configuration.json";
import { clearVacations, signout } from "../../actions";
import LocalUserSave from "../../services/LocalUserSave";
import { Card, CloseButton, Col, ListGroup } from "react-bootstrap";

function AdminVacation(props: { vacation: VacationType }) {
    const v = props.vacation;
    const userInfo = useSelector((state: ReduxState) => state.logged);
    const dispatch = useDispatch();
    /**
     * - Activates ServerRequests.deleteVacationAsync with the vacation id and the token
     * - if it fails, checks the error status and either disconnect the user because it
     * got 403 (Unautorized) or console.logs the error for other error.
     */
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
        <Col sm={12} lg={4} md={6}>
            <Card className="userCard">
                <Card.Img variant="top" src={`http://localhost:5000/public/images/${v.image_location}`} className="image"/>
                <NavLink to={`/editVacation/${v.vacation_id}`} className="editBtn">🖉</NavLink>
                <CloseButton onClick={deleteVacation} className="deleteBtn" />
                <Card.Body>
                    <Card.Title className="destination">{v.vacation_destination}</Card.Title>
                    <Card.Text>
                        {v.vacation_description}
                    </Card.Text>
                    <Card.Text className="price">{v.price}$</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Start Date: {new Date(v.start_date).toLocaleString("en-GB").substring(0, 10)}</ListGroup.Item>
                    <ListGroup.Item>End Date: {new Date(v.end_date).toLocaleString("en-GB").substring(0, 10)}</ListGroup.Item>
                    <ListGroup.Item>{v.followers} Users are following this vacation</ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    )
}

export default AdminVacation