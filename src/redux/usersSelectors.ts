import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";
import {FrontEndUserType} from "../types/types";

export const getPageSize = (state : AppStateType) => {
    return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state : AppStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state : AppStateType) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state : AppStateType) => {
    return state.usersPage.isFetching;
};

export const getIsFollowInProgress = (state : AppStateType) => {
    return state.usersPage.isFollowInProgress;
};

export const getUsers = (state : AppStateType) => {
    return state.usersPage.users;
};

// Very complicated logic for 50000000 minutes for example. Just an example of reselect lib workflow
export const getUsersReselect = createSelector(getUsers, getIsFetching,(users : Array<FrontEndUserType>, isFetching) =>{
    return users.filter(x  => true);
});