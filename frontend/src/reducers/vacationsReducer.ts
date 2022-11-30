import { VacationType } from "../types/types";

const vacationsReducer = (state = [], action: { type: string, data: VacationType[] }) => {
    switch (action.type) {
        case "VACATIONS":
            return action.data;
        default:
            return state;
    }
}

export default vacationsReducer