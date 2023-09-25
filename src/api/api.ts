import axios from "axios";

export const axiosInstance = axios.create({
        withCredentials : true,
        baseURL : "https://social-network.samuraijs.com/api/1.0/",
        headers: {
            "API-KEY": "f5abb6c8-36a9-4b47-b647-ba4073"
        }
    }
);
export enum ResultCodesEnum {
    SuccessfulResponse = 0,
    FailedResponse = 1,
}
export enum ResultCodeForCaptcha {
    AskedForCaptcha = 10,
}


