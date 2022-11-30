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

export interface UserType {
    first_name: string;
    last_name: string;
    token: string;
    user_id: 1;
    username: string;
}

export interface ReduxState {
    logged: { isLogged: boolean, isAdmin: boolean, userData: UserType };
    vacations: VacationType[];
}