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
        case "CHECK":
            list.push(action.vId);
            return list;
        case "UNCHECK":
            list.splice(list.indexOf(action.vId), 1);
            console.log(list);
            return list;
        default:
            return list;
    }
}

export default checkedReducer