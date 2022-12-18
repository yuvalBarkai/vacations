import { useSelector } from "react-redux"
import { ReduxState, VacationType } from "../../types";
import AdminVacation from "./AdminVacation";
import UserVacation from "./UserVacation";
import "./Vacations.css";

function Vacations() {
    const userInfo = useSelector((state: ReduxState) => state.logged);
    const vacationList = useSelector((state: ReduxState) => state.vacations);
    const checkedVac = useSelector((state: ReduxState) => state.checkedVacations);

    const sortVacations = (vacations: VacationType[]) => {
        return vacations.slice().sort((a, b) => { // sorting vacations by having the vacations in checkedVac first
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
                    <h2>Seems like there arent any vacations at the moment, come back later</h2>
                    :
                    <div className="vacationList">
                        {userInfo.isAdmin
                            ?
                            sortVacations(vacationList).map(v => <AdminVacation vacation={v} key={v.vacation_id} />)
                            :
                            sortVacations(vacationList).map(v => <UserVacation vacation={v} key={v.vacation_id} />)}
                    </div>
                :
                <h2>Log in and see our amazing vacations</h2>
            }
        </div>
    )
}

export default Vacations