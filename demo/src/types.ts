import User from "./models/User";
import Vacation from "./models/Vacation";

export interface RegisterType {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
}

export interface LoginType {
    username: string;
    password: string;
}

export interface VacationType {
    vacation_id: number;
    vacation_description: string;
    vacation_destination: string;
    image_location: string;
    start_date: string;
    end_date: string;
    price: number;
    followers: number;
}

export interface AddVacationForm {
    vacation_description: string;
    vacation_destination: string;
    image?: File[];
    start_date: string;
    end_date: string;
    price: number;
    vacation_id?:number;
    image_location?:string;
    followers?:number;
}

export interface UserType {
    first_name: string;
    last_name: string;
    token: string;
    user_id: number;
    username: string;
}

export interface ReduxState {
    logged: { isLogged: boolean, isAdmin: boolean, userData: User };
    vacations: Vacation[];
    checkedVacations: number[];
}

export interface DecodedToken {
    exp: number;
    iat: number;
    user: TokenUser;
}

export interface TokenUser {
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
}

export interface mySqlResultObj {
    affectedRows: number;
    changedRows: number;
    fieldCount: number;
    insertId: number;
    message: string;
    protocol41: boolean;
    serverStatus: number;
    warningCount: number;
}