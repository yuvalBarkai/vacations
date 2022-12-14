import axios, { AxiosResponse } from "axios"
import { AddVacationForm, loginType, RegisterType } from "../types"
import config from "../configuration.json";
import { Dispatch } from "@reduxjs/toolkit";
import { signin, sortVacactions, updateChecked } from "../actions";
import SocketService from "./SocketService";
import LocalUserSave from "./LocalUserSave";

class ServerRequests {
    static registerAsync = async (registrationData: RegisterType, dispatch: Dispatch) => {
        await axios.post(config.serverRegisterAddr, registrationData);
        const loginInfo = { username: registrationData.username, password: registrationData.password };
        ServerRequests.loginAsync(loginInfo, dispatch);
    }

    static loginAsync = async (loginInfo: loginType, dispatch: Dispatch) => {
        const { data } = await axios.post(config.serverLoginAddr, loginInfo);
        const followedVac = await ServerRequests.getVacFollowsAsync(data.user_id, data.token);
        dispatch(updateChecked(followedVac));
        dispatch(signin(data));
        SocketService.connect(dispatch);
        LocalUserSave.newLogin(data);
    }

    static getVacFollowsAsync = async (user_id: number, token: string): Promise<number[]> => {
        const response = await axios.get<{ vacation_id: number }[]>(`${config.serverGetFollowsAddr}/${user_id}`,
            { headers: { Authorization: `bearer ${token}` } });
        return response.data.map(v => v.vacation_id);
    }

    static patchVacationFollowAsync = async (isFollow: boolean, vacation_id: number, user_id: number,
        token: string, checkedVacations: number[], dispatch: Dispatch) => {
        const checkedVac = [...checkedVacations];
        await axios.patch(
            `${config.serverPatchFollowAddr}/${vacation_id}`, { isFollow, userId: user_id },
            { headers: { Authorization: `bearer ${token}` } });
        if (isFollow) {
            checkedVac.push(vacation_id);
        } else {
            checkedVac.splice(checkedVac.indexOf(vacation_id), 1);
        }
        dispatch(updateChecked(checkedVac));
        dispatch(sortVacactions(checkedVac));
    }

    static deleteVacationAsync = async (vacation_id: number, token: string): Promise<AxiosResponse> => {
        return await axios.delete(`http://localhost:5000/admin/vacations/${vacation_id}`,
            { headers: { Authorization: `bearer ${token}` } });
    }

    static postVacationAsync = async (newVacation: AddVacationForm, token: string) => {
        const formData = ServerRequests.vacationToFormData(newVacation);
        const response = await axios.post(config.serverPostVacationAddr, formData,
            { headers: { Authorization: `bearer ${token}` } });
        return response.data;
    }

    static editVacationAsync = async (vacationId: string, newVacation: AddVacationForm, token: string): Promise<string> => {
        const formData = ServerRequests.vacationToFormData(newVacation);
        const response = await axios.put(`${config.serverPutVacationAddr}/${vacationId}`, formData,
            { headers: { Authorization: `bearer ${token}` } });
        return response.data;
    }

    static vacationToFormData = (newVacation: AddVacationForm) => {
        const formData = new FormData();
        formData.append("vacation_description", newVacation.vacation_description);
        formData.append("vacation_destination", newVacation.vacation_destination);
        formData.append("image", newVacation.image[0]);
        formData.append("start_date", newVacation.start_date);
        formData.append("end_date", newVacation.end_date);
        formData.append("price", String(newVacation.price));
        return formData;
    }
}

export default ServerRequests