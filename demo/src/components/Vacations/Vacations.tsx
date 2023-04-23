import "./Vacations.scss";
import Container from 'react-bootstrap/Container';
import { useSelector } from "react-redux"
import { ReduxState, VacationType } from "../../types";
import AdminVacation from "./AdminVacation";
import UserVacation from "./UserVacation";
import { Row } from "react-bootstrap";
import config from "../../configuration.json";


function Vacations() {
    const userInfo = useSelector((state: ReduxState) => state.logged);
    const vacationList = useSelector((state: ReduxState) => state.vacations);
    const checkedVac = useSelector((state: ReduxState) => state.checkedVacations);

    /**
     * - slices to not change the reduxState
     * - sorts with 4 trenary expression that handle every scenario of a, b
     * regarding the checkedVac 
     * @param {VacationType[]} vacations 
     * @returns The vacations array but sorted by having the vacations that
     * their id's are found in the checkedVac first.
     */
    const sortVacations = (vacations: VacationType[]) => {
        return vacations.slice().sort((a, b) => {
            return (checkedVac.includes(a.vacation_id) && checkedVac.includes(b.vacation_id))
                ? 0 : checkedVac.includes(a.vacation_id) ? -1
                    : checkedVac.includes(b.vacation_id) ? 1 : 0;
        })
    }

    return (
        <div>
            {userInfo.isLogged
                ?
                vacationList.length === 0 ?
                    <h2>Seems like there arent any vacations at the moment, <br />
                        feel free to come back later</h2>
                    :
                    <Container fluid className="vacationsContainer">
                        <Row>
                            {userInfo.isAdmin
                                ?
                                sortVacations(vacationList).map(v => <AdminVacation vacation={v} key={v.vacation_id} />)
                                :
                                sortVacations(vacationList).map(v => <UserVacation vacation={v} key={v.vacation_id} />)}
                        </Row>
                    </Container>
                :
                <div>
                    {/* <img src={require("../../assets/homeImg.jpg")} alt="Not found" className="homeImg" /> */}
                    <div className="homeImg">
                        <div className="homeMsg">Welcome to {config.siteName} feel free to login <br />
                            and see your next get away</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Vacations