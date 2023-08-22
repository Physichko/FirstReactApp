import {authenticationApi, securityApi} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    id : null,
    email : null,
    login : null,
    isFetching : false,
    isAuthorized : false,
    captchaUrl : null
};

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER_DATA : {
            return {
                ...state,
                ...action.userData,
                isAuthorized: action.userData.isAuth
            };
        }
        case TOGGLE_IS_FETCHING : {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case GET_CAPTCHA_URL_SUCCESS : {
            return {
                ...state,
                captchaUrl: action.url
            }
        }

        default : {
            return state;
        }
    }
};


export const setUserDataActionCreator = (userName,email,login, id, isAuth) => ({type : SET_USER_DATA, userData : {userName, email, login, id ,isAuth}});
export const setIsToggleFetchingActionCreator = (isFetching) => ({type : TOGGLE_IS_FETCHING, isFetching : isFetching,});
export const getCaptchaUrlActionCreator = (url) => ({type : GET_CAPTCHA_URL_SUCCESS, url})
export const loginCookieThunkCreator = () => {
    return (dispatch) => {
        dispatch(setIsToggleFetchingActionCreator(true));
        return authenticationApi.loginByCookie()
            .then(data => {
                if(data.resultCode === 0)
                {
                    dispatch(setUserDataActionCreator(data.data.userName, data.data.email, data.data.login,data.data.id,true));
                }
                dispatch(setIsToggleFetchingActionCreator(false));
            });
    };
}

export const loginCredentialsThunkCreator = (email, password, rememberMe, captcha, setErrors) =>{
    return (dispatch) => {
        dispatch(setIsToggleFetchingActionCreator(true));
        authenticationApi.loginByCredentials(email,password,rememberMe,captcha)
            .then(data => {
                if(data.resultCode === 0)
                {
                    dispatch(loginCookieThunkCreator());
                }
                else{
                    if (data.resultCode === 10){
                        dispatch(getCaptchaUrlThunkCreator())
                    }
                    setErrors({apiErrors : data.messages[0]});
                }
                dispatch(setIsToggleFetchingActionCreator(false));
            });
    };
}

export const logoutThunkCreator = (email, password, rememberMe) =>{
    return (dispatch) => {
        dispatch(setIsToggleFetchingActionCreator(true));
        authenticationApi.logout()
            .then(data => {
                if(data.resultCode === 0)
                {
                    dispatch(setUserDataActionCreator(data.data.userName, data.data.email, data.data.login,data.data.id,false));
                }
                dispatch(setIsToggleFetchingActionCreator(false));
            });
    };
}

export const getCaptchaUrlThunkCreator = () =>{
    return async (dispatch) => {
        const response = await securityApi.getCaptcha();
        const captchaUrl = response.url;
        dispatch(getCaptchaUrlActionCreator(captchaUrl));
    };
}
export default authReducer;