import { combineReducers } from "redux";

import { adminReducer } from "./adminReducer";
import {authReducer} from "./authReducer"
const reducer = combineReducers({ admin: adminReducer,auth: authReducer});
export default reducer;
