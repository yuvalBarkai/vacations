import { VacationType } from "../types";

interface VacActionType {
    type: string;
    data: VacationType[];
    checkedVac: number[];
}

const vacationsReducer = (state: VacationType[] = [], action: VacActionType) => {
    switch (action.type) {
        case "VACATIONS":
            return action.data;
        case "CLEAR_VACATIONS":
            return [];
        default:
            return state;
    }
}

export default vacationsReducer