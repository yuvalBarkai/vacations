
import { VacationType } from "../types";

const vacationsReducer = (state:VacationType[] = [], action: { type: string, data: VacationType[], checkedVac: number[] }) => {
    switch (action.type) {
        case "VACATIONS":
            return action.data;
        case "CLEAR_VACATIONS":
            return [];
        case "SORT_VACATIONS":
            return state.slice().sort((a, b) => { // sorting vacations by having the vacations in checkedVac first
                return action.checkedVac.includes(a.vacation_id) &&
                    action.checkedVac.includes(b.vacation_id) ? 0 : action.checkedVac.includes(a.vacation_id) ? -1 : 1;
            })
        default:
            return state;
    }
}

export default vacationsReducer