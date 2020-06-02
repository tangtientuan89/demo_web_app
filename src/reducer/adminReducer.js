


const adminInitialState = {
    manageUser:false,
}
export const adminReducer = (state = adminInitialState, action) => {
    switch (action.type) {
        case "MANAGEUSER_SHOW":
            return {manageUser:!state.manageUser}
        case "MANAGEUSER_HIDE":
            return  {manageUser:state.manageUser}
        default:
            return state
    }
}