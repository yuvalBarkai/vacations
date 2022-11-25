const loggedReducer = (state = false, action: { type: string }) => {
    switch (action.type) {
        case "SIGN_IN":
            return true;
        case "SIGN_OUT":
            return false;
        default:
            return state;
    }
}

export default loggedReducer