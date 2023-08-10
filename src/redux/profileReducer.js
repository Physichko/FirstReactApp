import {profileApi} from "../api/api";

const ADD_POST = "profileReducer/ADD_POST";
const DELETE_POST = "profileReducer/DELETE_POST";
const SET_USER_PROFILE = "profileReducer/SET_USER_PROFILE";
const SET_USER_STATUS = "profileReducer/UPDATE_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "profileReducer/SAVE_PHOTO_SUCCESS";

let initialState = {
    posts: [
        {id: 1, likes: 4, text: "Hi, how are you?"},
        {id: 2, likes: 8, text: "it is my my first post"},
        {id: 3, likes: 15, text: "Pashka, ti nahuy suda prishol?"},
        {id: 4, likes: 16, text: "Provalivai s moei stranichki"},
        {id: 5, likes: 23, text: "Ufff chto za tyagi takie barhatnie..."},
        {id: 6, likes: 42, text: "Keeeefteeeeemeeeeeeeee"}
    ],
    profile : null,
    status : "",
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPostText = action.newPostText;
            return  {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, text: newPostText, likes: 0,}],
                newPostText: "",
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: [...state.posts.filter(x => x.id !== action.postId)]
            }
        }
        case SET_USER_PROFILE : {
            return {
                ...state,
                profile : action.profile,
            }
        }

        case SET_USER_STATUS : {
            return {
                ...state,
                status : action.status,
            }
        }

        case SAVE_PHOTO_SUCCESS : {
            return {
                ...state,
                profile: {...state.profile, photos: { large: action.photos.large, small : action.photos.small}}
            }
        }

        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => ({ type : ADD_POST, newPostText});
export const deletePostActionCreator = (postId) => ({ type : DELETE_POST, postId});
export const setUserProfileActionCreator = (profile) => ({ type : SET_USER_PROFILE, profile : profile});
export const savePhotoSuccessActionCreator = (photos) => ({type : SAVE_PHOTO_SUCCESS,photos : photos})

export const setProfileThunkCreator = (userId) => {
    return async (dispatch) => {
        let response = await profileApi.getProfile(userId);
        dispatch(setUserProfileActionCreator(response));
    }
};

export const setUserStatusActionCreator = (status) => ({ type : SET_USER_STATUS, status});

export const getUserStatusThunkCreator = (userId) => {
    return async (dispatch) => {
        let response = await profileApi.getStatus(userId);
        dispatch(setUserStatusActionCreator(response))
    }
}

export const updateUserStatusThunkCreator = (status) => {
    return async (dispatch) => {
        let response = await profileApi.setStatus(status);
        dispatch(setUserStatusActionCreator(status))
    }
}

export const savePhotoThunkCreator = (file) => {
    return async (dispatch) => {
        let response = await profileApi.uploadPhoto(file);
        if(response.resultCode === 0) {
            dispatch(savePhotoSuccessActionCreator(response.data.photos))
        }
    }
}

export default profileReducer;