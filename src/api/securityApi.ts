import {axiosInstance} from "./api";

type SecurityCaptchaType ={
    url : string
}
export const securityApi = {
    getCaptcha: (): Promise<SecurityCaptchaType> => {
        return axiosInstance.get<SecurityCaptchaType>(`security/get-captcha-url`)
            .then(response => {
                return response.data
            });
    }
}