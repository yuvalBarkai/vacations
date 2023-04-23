import User from "./models/User"
import Vacation from "./models/Vacation"
import { AddVacationForm } from "./types"

export const signin = (user: User) => {
    return { type: "SIGN_IN", user }
}

export const signout = () => {
    return { type: "SIGN_OUT" }
}

export const updateVacatios = (vacations: Vacation[]) => {
    return { type: "VACATIONS", data: vacations }
}

export const newVacation = (newVacation: AddVacationForm) => {
    return { type: "NEW_VACATION", newVacation }
}

export const alterVacation = (newVacation: Vacation | AddVacationForm) => {
    return { type: "ALTER_VACATION", newVacation }
}

export const deleteVacation = (vId: number) => {
    return { type: "DELETE_VACATION", vId }
}

export const clearVacations = () => {
    return { type: "CLEAR_VACATIONS" }
}

export const updateChecked = (checkedVac: number[]) => {
    return { type: "UPDATE_CHECKED", data: checkedVac }
}

export const checkVacation = (vacationId: number) => {
    return { type: "CHECK", vId: vacationId }
}
export const unCheckVacation = (vacationId: number) => {
    return { type: "UNCHECK", vId: vacationId }
}

export const clearChecked = () => {
    return { type: "CLEAR_CHECKED" }
}