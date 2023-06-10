const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOW_IN_PROGRESS = "TOGGLE_IS_FOLLOW_IN_PROGRESS";

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
                users: state.users.map(x => {
                    if(x.id === action.userId)
                    {
                        return {
                            ...x,
                            followed: true
                        };
                    }
                    return x;
                })
            };

        }
        case UNFOLLOW : {
            return  {
                ...state,
                users: state.users.map(x => {
                    if(x.id === action.userId)
                    {
                        return {
                            ...x,
                            followed: false
                        };
                    }
                    return x;
                })
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

export const followActionCreator = (userId) => ({type : FOLLOW, userId : userId});
export const unfollowActionCreator = (userId) => ({type : UNFOLLOW, userId : userId});
export const setUsersActionCreator = (users) => ({type : SET_USERS, users : users});
export const setTotalUsersCountActionCreator = (count) => ({type : SET_TOTAL_USERS_COUNT, count : count});
export const setCurrentPageActionCreator = (clickedPage) => ({type : SET_CURRENT_PAGE, clickedPage : clickedPage});
export const setToggleIsFetchingActionCreator = (isFetching) => ({type : TOGGLE_IS_FETCHING, isFetching : isFetching});
export const setToggleIsFollowInProgressActionCreator = (isFollowInProgress, userId) => ({type : TOGGLE_IS_FOLLOW_IN_PROGRESS, isFollowInProgress : isFollowInProgress, userId : userId});


export default usersReducer;