import { useSelector } from "react-redux"
import { ReduxState } from "../../types";
import AdminVacation from "./AdminVacation";
import UserVacation from "./UserVacation";
import "./Vacations.css";

function Vacations() {
    const userInformation = useSelector((state: ReduxState) => state.logged);
    const vacationList = useSelector((state: ReduxState) => state.vacations);

    return (
        <div>
            {userInformation.isLogged
                ?
                <div className="vacationList">
                    {userInformation.isAdmin
                        ?
                        vacationList.map(v => <AdminVacation vacation={v} key={v.vacation_id} />)
                        :
                        vacationList.map(v => <UserVacation vacation={v} key={v.vacation_id} />)}
                </div>
                :
                <h2>Log in and see our amazing vacations</h2>
            }
        </div>
    )
}

export default Vacations