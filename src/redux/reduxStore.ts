import {combineReducers} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import {configureStore} from "@reduxjs/toolkit";

let rootReducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    usersPage:usersReducer,
    auth: authReducer,
    app : appReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends {[key : string] : infer U }? U : never;
export type InferActionsTypes<T extends {[key : string] : (...arg:any[]) => any }> = ReturnType<PropertiesTypes<T>>

const store = configureStore({reducer :rootReducer});
// @ts-ignore
window.store = store;
export default store;