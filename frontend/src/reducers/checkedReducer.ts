
interface CheckedActionType {
    type: string;
    vId: number;
    data: number[];
}

function checkedReducer(state: number[] = [], action: CheckedActionType) {
    const list = [...state];
    switch (action.type) {
        case "UPDATE_CHECKED":
            return action.data;
        case "CLEAR_CHECKED":
            return [];
        default:
            return list;
    }
}

export default checkedReducer