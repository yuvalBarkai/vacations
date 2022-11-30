import { VacationType } from "../types/types"

export const signin = (isAdmin: boolean) => {
    return { type: "SIGN_IN", admin: isAdmin }
}

export const signout = () => {
    return { type: "SIGN_OUT" }
}

export const updateVacatios = (vacations: VacationType[]) => {
    return { type: "VACATIONS", data: vacations }
}