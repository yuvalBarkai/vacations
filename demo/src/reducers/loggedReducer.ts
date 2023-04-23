import config from "../configuration.json";
import User from "../models/User";

interface actionType {
    type: string;
    user: User;
}

const loggedReducer = (state = { isLogged: false, isAdmin: false, userData: {} }, action: actionType) => {
    switch (action.type) {
        case "SIGN_IN":
            return { isLogged: true, isAdmin: config.adminListUserId.includes(action.user.user_id), userData: action.user };
        case "SIGN_OUT":
            return { isLogged: false, isAdmin: false, userData: {} };
        default:
            return state;
    }
}

export default loggedReducer