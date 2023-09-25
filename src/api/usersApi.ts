import {axiosInstance} from "./api";
import {FrontEndUserType, UserType} from "../types/types";

type UsersResponseType<T> = {
    items : Array<T>
    totalCount : number
    error : string
}

export const usersApi = {
    getUsers: (currentPage = 1, pageSize = 10): Promise<UsersResponseType<FrontEndUserType>> => {
        return axiosInstance.get<UsersResponseType<UserType>>(`users?page=${currentPage}&count=${pageSize}`)
            .then<UsersResponseType<FrontEndUserType>>(response => ({
                totalCount: response.data.totalCount,
                error: response.data.error,
                items: response.data.items.map<FrontEndUserType>(x => ({...x, isFollowed: x.followed}))
            }));
    }
};