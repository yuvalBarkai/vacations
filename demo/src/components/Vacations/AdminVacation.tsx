import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { VacationType } from "../../types"
import { deleteVacation } from "../../actions";
import { Card, CloseButton, Col, ListGroup } from "react-bootstrap";

function AdminVacation(props: { vacation: VacationType }) {
    const v = props.vacation;
    const dispatch = useDispatch();

    const removeVacation = () => {
        dispatch(deleteVacation(v.vacation_id));
    }
    return (
        <Col sm={12} lg={4} md={6}>
            <Card className="userCard">
                <Card.Img variant="top" src={`/images/${v.image_location}`} className="image" />
                <NavLink to={`/editVacation/${v.vacation_id}`} className="editBtn">🖉</NavLink>
                <CloseButton onClick={removeVacation} className="deleteBtn" />
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