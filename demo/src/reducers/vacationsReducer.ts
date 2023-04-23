import Vacation from "../models/Vacation";

interface VacActionType {
    type: string;
    data?: Vacation[];
    newVacation?: Vacation;
    checkedVac?: number[];
    vId?: number;
}

const vacationsReducer = (state: Vacation[] = [], action: VacActionType) => {
    const list = [...state];
    switch (action.type) {
        case "NEW_VACATION":
            if (action.newVacation)
                list.push(action.newVacation);
            return list;
        case "VACATIONS":
            return action.data;
        case "ALTER_VACATION":
            if (action.newVacation) {
                const AlterIndex = list.findIndex(v => v.vacation_id === action.newVacation?.vacation_id);
                if (AlterIndex > -1) {
                    action.newVacation.image_location = list[AlterIndex].image_location;
                    list[AlterIndex] = action.newVacation;
                }
            }
            return list;
        case "DELETE_VACATION":
            const deleteIndex = list.findIndex(v => v.vacation_id === action.vId)
            if (deleteIndex > -1)
                list.splice(deleteIndex, 1);
            return list;
        case "CLEAR_VACATIONS":
            return [];
        default:
            return state;
    }
}

export default vacationsReducer