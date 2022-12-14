export interface RegisterType {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
}


export interface loginType {
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
    image: File[];
    start_date: string;
    end_date: string;
    price: number;
}

export interface UserType {
    first_name: string;
    last_name: string;
    token: string;
    user_id: number;
    username: string;
    expirationTime?: Date;
    savedChecked?: number[];
}

export interface ReduxState {
    logged: { isLogged: boolean, isAdmin: boolean, userData: UserType };
    vacations: VacationType[];
    checkedVacations: number[];
}