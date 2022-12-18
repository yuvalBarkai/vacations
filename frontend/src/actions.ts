import { UserType, VacationType } from "./types"

export const signin = (userData: UserType) => {
    return { type: "SIGN_IN", user: userData }
}

export const signout = () => {
    return { type: "SIGN_OUT" }
}

export const updateVacatios = (vacations: VacationType[]) => {
    return { type: "VACATIONS", data: vacations }
}

export const clearVacations = () => {
    return { type: "CLEAR_VACATIONS" }
}

export const updateChecked = (checkedVac: number[]) => {
    return { type: "UPDATE_CHECKED", data: checkedVac }
}

export const clearChecked = () => {
    return { type: "CLEAR_CHECKED" }
}