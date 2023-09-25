import {axiosInstance, ResultCodesEnum} from "./api";

type FollowApiResponseType = {
    resultCode : ResultCodesEnum
    messages : Array<string>
}
export const followApi = {
    follow: (userId: number): Promise<FollowApiResponseType> => {
        return axiosInstance.post<FollowApiResponseType>(`follow/${userId}`)
            .then(response => response.data);
    },

    unfollow: (userId: number): Promise<FollowApiResponseType> => {
        return axiosInstance.delete<FollowApiResponseType>(`follow/${userId}`)
            .then(response => response.data);
    },
};