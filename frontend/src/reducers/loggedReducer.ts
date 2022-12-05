import { UserType } from "../types";

interface actionType {
    type: string;
    user: UserType;
}

const loggedReducer = (state = { isLogged: false, isAdmin: false, userData: {} }, action: actionType) => {
    switch (action.type) {
        case "SIGN_IN":
            return { isLogged: true, isAdmin: action.user.user_id === 1, userData: action.user };
        case "SIGN_OUT":
            return { isLogged: false, isAdmin: false, userData: {} };
        default:
            return state;
    }
}

export default loggedReducer