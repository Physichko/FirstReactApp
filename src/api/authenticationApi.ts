import {
    axiosInstance, ResultCodeForCaptcha, ResultCodesEnum,

} from "./api";

type LoginByCookieResponseType = {
    id : number
    email : string
    login : string
};

type LoginByCredentialsResponseType = {
    id : number
};

type AuthenticationResponseType<d = {}, rc = ResultCodesEnum> = {
    data : d
    resultCode : rc
    messages : Array<string>
}

export const authenticationApi = {
    loginByCookie: (): Promise<AuthenticationResponseType<LoginByCookieResponseType>> => {
        return axiosInstance.get<AuthenticationResponseType<LoginByCookieResponseType>>(`auth/me`)
            .then(response => response.data);
    },
    loginByCredentials: (email: string, password: string, rememberMe = false, captcha: null | string = null): Promise<AuthenticationResponseType<LoginByCredentialsResponseType,ResultCodesEnum | ResultCodeForCaptcha>> => {
        return axiosInstance.post<AuthenticationResponseType<LoginByCredentialsResponseType, ResultCodesEnum | ResultCodeForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data;
            });
    },
    logout: (): Promise<AuthenticationResponseType> => {
        return axiosInstance.delete(`auth/login`)
            .then<AuthenticationResponseType>(response => {
                return response.data;
            });
    }
}