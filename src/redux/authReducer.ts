import {FormikErrors, FormikValues} from "formik";
import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {authenticationApi} from "../api/authenticationApi";
import {securityApi} from "../api/securityApi";

type AuthenticationStateType = {
    userData : UserDataType;
    isFetching : boolean;
    captchaUrl : null | string;
}

type UserDataType = {
    id : null | number;
    login : null | string;
    email: null | string;
    isAuthorized : boolean;
}

const initialState : AuthenticationStateType = {
    userData : {
        id : null,
        login : null,
        email : null,
        isAuthorized : false
    },
    isFetching : false,
    captchaUrl : null
};

type ActionsTypes = InferActionsTypes<typeof authReducerActionCreators>
const authReducer = (state : AuthenticationStateType = initialState, action : ActionsTypes): AuthenticationStateType => {
    switch (action.type){
        case 'SET_USER_DATA' : {
            return{
                ...state,
                userData : {...action.userData}
            };
        }
        case 'TOGGLE_IS_FETCHING' : {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case 'GET_CAPTCHA_URL_SUCCESS' : {
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        }

        default : {
            return state;
        }
    }
};

export const authReducerActionCreators = {
    setUserDataActionCreator : (userData : UserDataType) => ({type : 'SET_USER_DATA', userData : userData} as const),
    setIsToggleFetchingActionCreator : (isFetching : boolean)  => ({type : 'TOGGLE_IS_FETCHING', isFetching : isFetching} as const),
    getCaptchaUrlActionCreator : (captchaUrl : string)  => ({type : 'GET_CAPTCHA_URL_SUCCESS', captchaUrl : captchaUrl} as const),
}

export const loginCookieThunkCreator = () : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch) : Promise<void> => {
        dispatch(authReducerActionCreators.setIsToggleFetchingActionCreator(true));
        let loginByCookieData =  await authenticationApi.loginByCookie();
        if(loginByCookieData.resultCode === ResultCodesEnum.SuccessfulResponse)
        {
            let userData : UserDataType = {
                id : loginByCookieData.data.id,
                login :  loginByCookieData.data.login,
                email:  loginByCookieData.data.email,
                isAuthorized :  true,
            };
            dispatch(authReducerActionCreators.setUserDataActionCreator(userData));
        }
        dispatch(authReducerActionCreators.setIsToggleFetchingActionCreator(false));
    };
}

export const loginCredentialsThunkCreator = (email : string, password : string, rememberMe: boolean, captchaUrl : string | null, setErrors : (errors : FormikErrors<FormikValues>) => void ) : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>  =>{
    return async (dispatch) => {
        dispatch(authReducerActionCreators.setIsToggleFetchingActionCreator(true));
        let loginByCredentialsData= await authenticationApi.loginByCredentials(email,password,rememberMe, captchaUrl);
        if(loginByCredentialsData.resultCode === ResultCodesEnum.SuccessfulResponse)
        {
            await dispatch(loginCookieThunkCreator());
        }
        else{
            if (loginByCredentialsData.resultCode === ResultCodeForCaptcha.AskedForCaptcha){
                await dispatch(getCaptchaUrlThunkCreator())
            }
            setErrors({apiErrors : loginByCredentialsData.messages[0]});
        }
        dispatch(authReducerActionCreators.setIsToggleFetchingActionCreator(false));
    };
}

export const logoutThunkCreator = () : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>=>{
    return async (dispatch) => {
        dispatch(authReducerActionCreators.setIsToggleFetchingActionCreator(true));
        let logoutData = await authenticationApi.logout();
        if(logoutData.resultCode === ResultCodesEnum.SuccessfulResponse)
        {
            let userData : UserDataType = {
                id : null,
                login :  null,
                email:  null,
                isAuthorized :  false,
            };
            dispatch(authReducerActionCreators.setUserDataActionCreator(userData));
        }
        dispatch(authReducerActionCreators.setIsToggleFetchingActionCreator(false));
    };
}

export const getCaptchaUrlThunkCreator = () : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>=>{
    return async (dispatch) => {
        let response = await securityApi.getCaptcha();
        let captchaUrl = response.url;
        dispatch(authReducerActionCreators.getCaptchaUrlActionCreator(captchaUrl));
    };
}
export default authReducer;