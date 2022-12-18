import jwtDecode from "jwt-decode";
import config from "../configuration.json"
import { DecodedToken, UserType } from "../types";
import ServerRequests from "./ServerRequests";

class LocalUserSave {
    static newLogin = (token: string) => {
        localStorage.removeItem(config.localStorageSaveName);
        localStorage.setItem(config.localStorageSaveName, token);
    }
    
    static autoLoginAsync = async (): Promise<{ followedVac: number[], user: UserType } | void> => {
        const savedToken = localStorage.getItem(config.localStorageSaveName);
        if (savedToken) {
            const now = new Date();
            const decodedToken = jwtDecode<DecodedToken>(savedToken);
            const tokenUser = decodedToken.user;
            const tokenExp = new Date(0);
            tokenExp.setSeconds(decodedToken.exp);
            if (tokenExp > now) {
                const followedVac = await ServerRequests.getVacFollowsAsync(tokenUser.user_id, savedToken);
                const user = { ...tokenUser } as UserType;
                user.token = savedToken;
                return { followedVac, user }
            }
        }
    }
    static removeToken = () => {
        localStorage.removeItem(config.localStorageSaveName);
    }
}

export default LocalUserSave