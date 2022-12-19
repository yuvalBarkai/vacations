import jwtDecode from "jwt-decode";
import config from "../configuration.json"
import { DecodedToken, UserType } from "../types";
import ServerRequests from "./ServerRequests";
import SocketService from "./SocketService";

class LocalUserSave {
    /**
     * - Removes a localStorage save if it exists.
     * - Sets a new localStorage save with the name in the configuration
     * and a value of the users token.
     * @param {string} token 
     */
    static newLogin = (token: string) => {
        localStorage.removeItem(config.localStorageSaveName);
        localStorage.setItem(config.localStorageSaveName, token);
    }
    /**
     * - gets the saved token from the localStorage save if it exists.
     * - Checks if it got it and if it did procceds to decode it and check if it expired.
     * - If it is not expired it returns a the object specified below. 
     * @returns Promise with { followedVac: number[], user: UserType }
     * or an error or void if the token is expired/doesnt exist.
     */
    static autoLoginAsync = async (): Promise<{ followedVac: number[], user: UserType } | Promise<void>> => {
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
    static disconnect = () => {
        SocketService.disconnect();
        localStorage.removeItem(config.localStorageSaveName);
    }
}

export default LocalUserSave