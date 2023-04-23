import axios from "axios"
import { AddVacationForm, LoginType, mySqlResultObj, RegisterType, UserType } from "../types"
import config from "../configuration.json";

class ServerRequests {
    /**
     * Attempts at registering the user by sending it's information to the server,
     * May go to catch if the username is taken or something also is wrong with
     * the request.
     * If the registration goes fine it calls the login function to log him the user in.
     * @param {RegisterType} registrationData 
     * @returns A promise filled with either an error or 
     * an object with the user's information and his followed vacations
     */
    static registerAsync = async (registrationData: RegisterType): Promise<{ data: UserType; followedVac: number[]; }> => {
        await axios.post(config.serverRegisterAddr, registrationData);
        const loginInfo = { username: registrationData.username, password: registrationData.password };
        return ServerRequests.loginAsync(loginInfo);
    }
    /**
     * Tries to login the user via a post request, if it goes fine it
     * then procceds to get his followed vacations ids array 
     * @param {LoginType} loginInfo 
     * @returns A promise filled with either an error or 
     * an object with the user's information and his followed vacations  
     */
    static loginAsync = async (loginInfo: LoginType): Promise<{ data: UserType; followedVac: number[]; }> => {
        const { data } = await axios.post(config.serverLoginAddr, loginInfo);
        const followedVac = await ServerRequests.getVacFollowsAsync(data.user_id, data.token);
        return { data, followedVac };
    }
    /**
     * Gets The followed vacations ids array of a certain user. 
     * @param {number} user_id 
     * @param {string} token 
     * @returns A Promise filled with an array that has the followed vacations ids or an error
     */
    static getVacFollowsAsync = async (user_id: number, token: string): Promise<number[]> => {
        const response = await axios.get<{ vacation_id: number }[]>(`${config.serverGetFollowsAddr}/${user_id}`,
            { headers: { Authorization: `bearer ${token}` } });
        return response.data.map(v => v.vacation_id);
    }
    /**
     * - copies the checkedVacations array in order to not change the reduxState.
     * - sends a patch request to the server with the vacation_id that was just followed or unfollowed.
     * also addes if it was followed or unfollowed and adds the token.
     * - Changes the checkedVac array according to the isFollow boolean.
     * @param {boolean} isFollow 
     * @param {number} vacation_id 
     * @param {string} token 
     * @param {number[]} checkedVacations 
     * @returns A Promise filled with checkedVac after it was changed or an error
     */
    static patchVacationFollowAsync = async (isFollow: boolean, vacation_id: number,
        token: string, checkedVacations: number[]): Promise<number[]> => {
        const checkedVac = [...checkedVacations];
        await axios.patch(
            `${config.serverPatchFollowAddr}/${vacation_id}`, { isFollow },
            { headers: { Authorization: `bearer ${token}` } });
        if (isFollow) {
            checkedVac.push(vacation_id);
        } else {
            checkedVac.splice(checkedVac.indexOf(vacation_id), 1);
        }
        return checkedVac;
    }
    /**
     * Sends a delete request to the server with the vacation_id to delete. 
     * @param {number} vacation_id 
     * @param {string} token 
     * @returns Promise with mySQL result object of the delete vacation request or an error
     */
    static deleteVacationAsync = async (vacation_id: number, token: string): Promise<mySqlResultObj> => {
        return await axios.delete(`http://localhost:5000/admin/vacations/${vacation_id}`,
            { headers: { Authorization: `bearer ${token}` } });
    }
    /**
     * - Tranform newVacation into formData format
     * - Sends the formData to the server to add a new vacation
     * @param {AddVacationForm} newVacation 
     * @param {string} token 
     * @returns Promise with mySQL result object or an error
     */
    static postVacationAsync = async (newVacation: AddVacationForm, token: string): Promise<mySqlResultObj> => {
        const formData = ServerRequests.vacationToFormData(newVacation);
        const response = await axios.post(config.serverPostVacationAddr, formData,
            { headers: { Authorization: `bearer ${token}` } });
        return response.data;
    }
    /**
     * - Tranform newVacation into formData format.
     * - Sends a put request to the server in order to change a certain vacation
     * @param {number} vacationId 
     * @param {AddVacationForm} newVacation 
     * @param {number} token 
     * @returns Promise with mySQL result object
     */
    static editVacationAsync = async (vacationId: string, newVacation: AddVacationForm, token: string): Promise<mySqlResultObj> => {
        const formData = ServerRequests.vacationToFormData(newVacation);
        const response = await axios.put(`${config.serverPutVacationAddr}/${vacationId}`, formData,
            { headers: { Authorization: `bearer ${token}` } });
        return response.data;
    }
    /**
     * @param {AddVacationForm} newVacation 
     * @returns A FormData with the information from the parameter newVacation. 
     */
    private static vacationToFormData = (newVacation: AddVacationForm): FormData => {
        const formData = new FormData();
        formData.append("vacation_description", newVacation.vacation_description);
        formData.append("vacation_destination", newVacation.vacation_destination);
        // formData.append("image", newVacation.image[0]);
        formData.append("start_date", newVacation.start_date);
        formData.append("end_date", newVacation.end_date);
        formData.append("price", String(newVacation.price));
        return formData;
    }
}

export default ServerRequests