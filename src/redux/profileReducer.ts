import {FormikErrors, FormikValues} from "formik";
import {Photos, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {profileApi} from "../api/profileApi";
import {ResultCodesEnum} from "../api/api";

type PostType = {
    id: number,
    likes : number,
    text : string,
}

let initialState = {
    posts: [
        {id: 1, likes: 4, text: "Hi, how are you?"},
        {id: 2, likes: 8, text: "it is my my first post"},
        {id: 3, likes: 15, text: "Pashka, ti nahuy suda prishol?"},
        {id: 4, likes: 16, text: "Provalivai s moei stranichki"},
        {id: 5, likes: 23, text: "Ufff chto za tyagi takie barhatnie..."},
        {id: 6, likes: 42, text: "Keeeefteeeeemeeeeeeeee"}
    ] as Array<PostType>,
    profile : null as ProfileType | null,
    newPostText : null as string | null,
    status : "",
};

type ProfileStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof profileReducerActionCreators>;
const profileReducer = (state : ProfileStateType = initialState, action : ActionsTypes) : ProfileStateType => {
    switch (action.type) {
        case 'ADD_POST': {
            let newPostText = action.newPostText;
            return  {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, text: newPostText, likes: 0,}],
                newPostText: "",
            };
        }
        case 'DELETE_POST': {
            return {
                ...state,
                posts: [...state.posts.filter(x => x.id !== action.idToRemove)]
            };
        }
        case 'SET_USER_PROFILE' : {
            return {
                ...state,
                profile : action.profile,
            };
        }

        case 'SET_USER_STATUS' : {
            return {
                ...state,
                status : action.status,
            };
        }

        case 'SAVE_PHOTO_SUCCESS' : {
            return {
                ...state,
                profile: {...state.profile, photos: { ...action.photos}} as ProfileType
            };
        }

        default:
            return state;
    }
};

export const profileReducerActionCreators = {
    addPostActionCreator : (newPostText : string)=> ({ type : 'ADD_POST', newPostText} as const),
    deletePostActionCreator : (postIdToRemove : number)=> ({ type : 'DELETE_POST', idToRemove : postIdToRemove} as const),
    setUserProfileActionCreator : (profile : ProfileType) => ({ type : 'SET_USER_PROFILE', profile : profile} as const),
    savePhotoSuccessActionCreator : (photos : Photos) => ({type : 'SAVE_PHOTO_SUCCESS',photos : photos} as const),
    setUserStatusActionCreator : (status : string) => ({ type : 'SET_USER_STATUS', status} as const),
}


export const setProfileThunkCreator = (userId : number) : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch) => {
        let response = await profileApi.getProfile(userId);
        dispatch(profileReducerActionCreators.setUserProfileActionCreator(response));
    }
};

export const getUserStatusThunkCreator = (userId : number) : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch) => {
        let response = await profileApi.getStatus(userId);
        dispatch(profileReducerActionCreators.setUserStatusActionCreator(response))
    }
}

export const updateUserStatusThunkCreator = (status : string) : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>  => {
    return async (dispatch) => {
            await profileApi.setStatus(status);
            dispatch(profileReducerActionCreators.setUserStatusActionCreator(status));
    }
}

export const savePhotoThunkCreator = (file : File) : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>  => {
    return async (dispatch) => {
        let response = await profileApi.uploadPhoto(file);
        if(response.resultCode === ResultCodesEnum.SuccessfulResponse) {
            dispatch(profileReducerActionCreators.savePhotoSuccessActionCreator(response.data.photos))
        }
    }
}

export const saveProfileDataThunkCreator = (data : ProfileType, setErrors : (errors : FormikErrors<FormikValues>) => void ) : ThunkAction<Promise<boolean>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch) => {
        let response = await profileApi.saveProfileData(data);
        if(response.resultCode === ResultCodesEnum.SuccessfulResponse){
            await dispatch(setProfileThunkCreator(data.userId));
            return true;
        }
        setErrors({apiErrors : response.messages});
        return false;
    }
}

export default profileReducer;