import {followApi, usersApi} from "../api/api";
import {updateObjectInArray} from "../utils/helpers/objectMappingHelper";

const FOLLOW = "usersReducer/FOLLOW";
const UNFOLLOW = "usersReducer/UNFOLLOW";
const SET_USERS = "usersReducer/SET_USERS";
const SET_TOTAL_USERS_COUNT = "usersReducer/SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "usersReducer/SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "usersReducer/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOW_IN_PROGRESS = "usersReducer/TOGGLE_IS_FOLLOW_IN_PROGRESS";

let initialState = {
    users : [],
    pageSize : 5,
    totalUsersCount : 0,
    currentPage : 1,
    isFetching : true,
    isFollowInProgress : [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type){
        case FOLLOW : {
            return  {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed : true})
            };

        }
        case UNFOLLOW : {
            return  {
                ...state,
                users:  updateObjectInArray(state.users, action.userId, "id", {followed : false})
            };
        }
        case SET_USERS : {
            return {
                ...state,
                users: [...action.users]
            };
        }

        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.clickedPage
            }
        }

        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case TOGGLE_IS_FOLLOW_IN_PROGRESS : {
            return {
                ...state,
                isFollowInProgress: action.isFollowInProgress
                    ? [...state.isFollowInProgress, action.userId]
                    : state.isFollowInProgress.filter(id => id != action.userId)
            }
        }

        default :
            return state;
    }
};

export const followSuccessActionCreator = (userId) => ({type : FOLLOW, userId : userId});
export const unfollowSuccessActionCreator = (userId) => ({type : UNFOLLOW, userId : userId});
export const setUsersActionCreator = (users) => ({type : SET_USERS, users : users});
export const setTotalUsersCountActionCreator = (count) => ({type : SET_TOTAL_USERS_COUNT, count : count});
export const setCurrentPageActionCreator = (clickedPage) => ({type : SET_CURRENT_PAGE, clickedPage : clickedPage});
export const setToggleIsFetchingActionCreator = (isFetching) => ({type : TOGGLE_IS_FETCHING, isFetching : isFetching});
export const setToggleIsFollowInProgressActionCreator = (isFollowInProgress, userId) => ({type : TOGGLE_IS_FOLLOW_IN_PROGRESS, isFollowInProgress : isFollowInProgress, userId : userId});

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(setToggleIsFetchingActionCreator(true));
        let response = await usersApi.getUsers(currentPage, pageSize)
        dispatch(setUsersActionCreator(response.items));
        dispatch(setTotalUsersCountActionCreator(response.totalCount));
        dispatch(setToggleIsFetchingActionCreator(false));
    };
}

const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
    dispatch(setToggleIsFollowInProgressActionCreator(true, id));
    let response = await apiMethod(id);

    if (response.resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(setToggleIsFollowInProgressActionCreator(false, id));
};
export const unfollowThunkCreator = (id) => {
    return async (dispatch) => {
        let apiMethod = followApi.unfollow.bind(followApi);
        await followUnfollowFlow(dispatch,id, apiMethod, unfollowSuccessActionCreator);
    };
}

export const follow = (id) => {
    return async (dispatch) => {
        let apiMethod = followApi.follow.bind(followApi);
        await followUnfollowFlow(dispatch,id, apiMethod, followSuccessActionCreator);
    };
}


export default usersReducer;