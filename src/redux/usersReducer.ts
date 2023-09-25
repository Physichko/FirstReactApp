// @ts-ignore
import {updateObjectInArray} from "../utils/helpers/objectMappingHelper";
import {FrontEndUserType, UserType} from "../types/types";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";
import {usersApi} from "../api/usersApi";
import {followApi} from "../api/followApi";

let initialState = {
    users : [] as Array<UserType>,
    pageSize : 5,
    totalUsersCount : 0,
    currentPage : 1,
    isFetching : true,
    isFollowInProgress : [] as Array<number>,
};

type UsersStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof usersReducerActionCreators>
type DispatchType = Dispatch<ActionsTypes>;

const usersReducer = (state : UsersStateType = initialState, action : ActionsTypes) => {
    switch (action.type){
        case "FOLLOW" : {
            return  {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {isFollowed : true})
            };

        }
        case "UNFOLLOW" : {
            return  {
                ...state,
                users:  updateObjectInArray(state.users, action.userId, "id", {isFollowed : false})
            };
        }
        case "SET_USERS" : {
            return {
                ...state,
                users: [...action.users]
            };
        }

        case "SET_TOTAL_USERS_COUNT": {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }

        case "SET_CURRENT_PAGE": {
            return {
                ...state,
                currentPage: action.clickedPage
            }
        }

        case "TOGGLE_IS_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case "TOGGLE_IS_FOLLOW_IN_PROGRESS" : {
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

export const usersReducerActionCreators = {
    followSuccessActionCreator : (userId: number)=> ({type: 'FOLLOW', userId: userId} as const) ,
    unfollowSuccessActionCreator : (userId: number)=> ({
        type: 'UNFOLLOW',
        userId: userId
    } as const),
    setUsersActionCreator : (users: Array<FrontEndUserType>)=> ({
        type: 'SET_USERS',
        users: users
    } as const),
    setTotalUsersCountActionCreator : (count: number)=> ({
        type: 'SET_TOTAL_USERS_COUNT',
        count: count
    } as const),
    setCurrentPageActionCreator : (clickedPage: number)=> ({
        type: 'SET_CURRENT_PAGE',
        clickedPage: clickedPage
    } as const),
    setToggleIsFetchingActionCreator : (isFetching: boolean)=> ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching: isFetching
    } as const),
    setToggleIsFollowInProgressActionCreator : (isFollowInProgress: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOW_IN_PROGRESS',
        isFollowInProgress: isFollowInProgress,
        userId: userId
    } as const),
}

export const getUsersThunkCreator = (currentPage : number, pageSize: number) : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch , getState : () => AppStateType) => {
        dispatch(usersReducerActionCreators.setToggleIsFetchingActionCreator(true));
        let response = await usersApi.getUsers(currentPage, pageSize)
        dispatch(usersReducerActionCreators.setUsersActionCreator(response.items));
        dispatch(usersReducerActionCreators.setTotalUsersCountActionCreator(response.totalCount));
        dispatch(usersReducerActionCreators.setToggleIsFetchingActionCreator(false));
    };
}

const _followUnfollowFlow = async (dispatch : DispatchType, id : number, apiMethod : any, actionCreator : (userId : number) => ReturnType<typeof usersReducerActionCreators.followSuccessActionCreator> | ReturnType<typeof usersReducerActionCreators.unfollowSuccessActionCreator>) => {
    dispatch(usersReducerActionCreators.setToggleIsFollowInProgressActionCreator(true, id));
    let response = await apiMethod(id);

    if (response.resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(usersReducerActionCreators.setToggleIsFollowInProgressActionCreator(false, id));
};
export const unfollowThunkCreator = (id : number) : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>   => {
    return async (dispatch) => {
        let apiMethod = followApi.unfollow.bind(followApi);
        await _followUnfollowFlow(dispatch,id, apiMethod, usersReducerActionCreators.unfollowSuccessActionCreator);
    };
}

export const followThunkCreator = (id : number) : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>  => {
    return async (dispatch) => {
        let apiMethod = followApi.follow.bind(followApi);
        await _followUnfollowFlow(dispatch,id, apiMethod, usersReducerActionCreators.followSuccessActionCreator);
    };
}


export default usersReducer;