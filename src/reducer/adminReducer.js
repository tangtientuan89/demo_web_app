const adminInitialState = {
  isAdmin: false,
  manageUser: true,
};
export const adminReducer = (state= adminInitialState, action) => {
  switch (action.type) {
    case "MANAGEUSER_SHOW":
      return {...state,manageUser: true };
    case "MANAGEUSER_HIDE":
      return {...state, manageUser: false };
    case "ISADMIN_TRUE":
      return {...state, isAdmin: true };
    case "ISADMIN_FALSE":
      return {...state, isAdmin: false };
    default:
      return state;
  }
};
