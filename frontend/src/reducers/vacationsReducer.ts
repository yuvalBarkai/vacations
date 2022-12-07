import { VacationType } from "../types";

const vacationsReducer = (state = [], action: { type: string, data: VacationType[] }) => {
    switch (action.type) {
        case "VACATIONS":
            return action.data;
        case "CLEAR_VACATIONS":
            return []
        default:
            return state;
    }
}

export default vacationsReducer