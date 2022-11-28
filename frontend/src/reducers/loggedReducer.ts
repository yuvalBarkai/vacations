import { Action } from "@reduxjs/toolkit";

interface actionType {
    type: string;
    admin: boolean;
}

const loggedReducer = (state = { isLogged: false, isAdmin: false }, action: actionType) => {
    switch (action.type) {
        case "SIGN_IN":
            return { isLogged: true, isAdmin: action.admin };
        case "SIGN_OUT":
            return { isLogged: false, isAdmin: false };
        default:
            return state;
    }
}

export default loggedReducer