const authInitialState = {
    isLogin:false,
}
export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {isLogin:true}
        case "LOGOUT":
            return  {isLogin:false}
        default:
            return state
    }
}