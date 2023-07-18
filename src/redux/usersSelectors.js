import {createSelector} from "reselect";

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
};

export const getIsFollowInProgress = (state) => {
    return state.usersPage.isFollowInProgress;
};

export const getUsers = (state) => {
    return state.usersPage.users;
};

// Very complicated logic for 50000000 minutes for example. Just an example of reselect lib workflow
export const getUsersReselect = createSelector(getUsers, getIsFetching,(users, isFetching) =>{
    return users.filter(x => true);
});