

function checkedReducer(state: number[] = [], action: { type: string, vId: number, data: number[] }) {
    const list = [...state];
    switch (action.type) {
        case "CHECKED":
            list.push(action.vId);
            return list;
        case "UN_CHECKED":
            const index = list.indexOf(action.vId);
            list.splice(index, 1);
            return list;
        case "UPDATE_CHECKED":
            return action.data;
        case "CLEAR_CHECKED":
            return [];
        default:
            return list;
    }
}

export default checkedReducer