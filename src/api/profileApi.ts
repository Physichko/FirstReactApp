import {Photos, ProfileType} from "../types/types";
import {axiosInstance, ResultCodesEnum} from "./api";

type ProfileUploadPhotoType = {
    photos : Photos
}
type ProfileSetStatusType = {
    data : {}
}
type ProfileSaveDataType = {
    data : {}
}

type ProfileApiResponseType<T> = {
    data : T
    resultCode : ResultCodesEnum
    messages : Array<string>
}
export const profileApi = {
    getProfile: (userId: number): Promise<ProfileType> => {
        return axiosInstance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus: (userId: number): Promise<string> => {
        return axiosInstance.get<string>(`profile/status/${userId}`)
            .then(response => response.data);
    },
    setStatus: (statusText: string): Promise<ProfileApiResponseType<ProfileSetStatusType>> => {
        return axiosInstance.put<ProfileApiResponseType<ProfileSetStatusType>>(`profile/status`, {status: statusText})
            .then(response => {
                return response.data
            });
    },
    uploadPhoto: (file: File): Promise<ProfileApiResponseType<ProfileUploadPhotoType>> => {
        let formData = new FormData();
        formData.append("image", file);
        return axiosInstance.put<ProfileApiResponseType<ProfileUploadPhotoType>>(`profile/photo`, formData, {headers: {"Content-Type": "multipart/form-data"}})
            .then(response => {
                return response.data
            });
    },
    saveProfileData: (data: ProfileType): Promise<ProfileApiResponseType<ProfileSaveDataType>> => {
        return axiosInstance.put<ProfileApiResponseType<ProfileSaveDataType>>(`profile`, data)
            .then(response => {
                return response.data
            });
    }
};