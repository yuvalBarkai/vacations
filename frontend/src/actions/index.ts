export const signin = (isAdmin: boolean) => {
    return { type: "SIGN_IN", admin: isAdmin }
}

export const signout = () => {
    return { type: "SIGN_OUT" }
}