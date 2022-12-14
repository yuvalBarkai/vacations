import { Dispatch } from "@reduxjs/toolkit";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { signin, sortVacactions, updateChecked } from "../actions";
import config from "../configuration.json"
import { UserType } from "../types";
import ServerRequests from "./ServerRequests";
import SocketService from "./SocketService";

class LocalUserSave {
    static newLogin = (userInfo: UserType) => {
        localStorage.removeItem(config.localStorageObjName);
        const expTime = new Date();
        expTime.setMinutes(expTime.getMinutes() + config.userSaveLocalStorageExpTime);
        const savedInfo = { ...userInfo }
        savedInfo.expirationTime = expTime;
        localStorage.setItem(config.localStorageObjName, JSON.stringify(savedInfo));
    }

    static autoLogin = (dispatch: Dispatch) => {
        const savedUserInfo = localStorage.getItem(config.localStorageObjName);
        if (savedUserInfo) { // adjust some stuff this thing is halfway done
            const user = JSON.parse(savedUserInfo);
            const now = new Date();
            const decodedToken = jwtDecode<JwtPayload>(user.token);
            const tokenExp = new Date(0);
            if (decodedToken.exp)
                tokenExp.setSeconds(decodedToken.exp);
            if (tokenExp > now) {
                (async () => {
                    const followedVac = await ServerRequests.getVacFollowsAsync(user.user_id, user.token);
                    dispatch(updateChecked(followedVac));
                    dispatch(signin(user));
                    SocketService.connect(dispatch);
                    dispatch(sortVacactions(followedVac)); // maybe not needed
                    console.log(user.token);
                })()
            }
        }
    }
}

export default LocalUserSave