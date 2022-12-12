import { useSelector } from "react-redux"
import { ReduxState } from "../../types";
import AdminVacation from "./AdminVacation";
import UserVacation from "./UserVacation";
import "./Vacations.css";
import configuration from "../../configuration.json";

function Vacations() {
    const userInfo = useSelector((state: ReduxState) => state.logged);
    const vacationList = useSelector((state: ReduxState) => state.vacations);
    console.log(localStorage.getItem(configuration.localStorageObjName));
    return (
        <div>
            {userInfo.isLogged
                ?
                <div className="vacationList">
                    {userInfo.isAdmin
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