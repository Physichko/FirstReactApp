import axios from "axios";

const axiosInstance = axios.create({
        withCredentials : true,
        baseURL : "https://social-network.samuraijs.com/api/1.0/",
        headers: {
            "API-KEY": "e48c2589-1608-45ce-9dee-168e00faf266"
        }
    }
);

export const usersApi = {
    getUsers : (currentPage = 1, pageSize = 10) => {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    }
};

export const profileApi = {
    getProfile : (userId) => {
        return axiosInstance.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => response.data);
    }
};

export const followApi = {
    follow : (userId) => {
        return axiosInstance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
            .then(response => response.data);
    },

    unfollow : (userId) => {
        return  axiosInstance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
            .then(response => response.data);
    },
};

export const authenticationApi = {
    login : () => {
        return  axiosInstance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`)
            .then(response => response.data);
    },
}

