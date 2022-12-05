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

export const checked = (vId: number) => {
    return { type: "CHECKED", vId }
}

export const unChecked = (vId: number) => {
    return { type: "UN_CHECKED", vId }
}