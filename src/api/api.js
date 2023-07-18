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
        return axiosInstance.get(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus : (userId) => {
        return axiosInstance.get(`profile/status/${userId}`)
            .then(response => response.data);
    },
    setStatus : (statusText) => {
        return axiosInstance.put(`profile/status`, {status : statusText})
            .then(response =>{
                return response.data
            });
    }
};

export const followApi = {
    follow : (userId) => {
        return axiosInstance.post(`follow/${userId}`)
            .then(response => response.data);
    },

    unfollow : (userId) => {
        return  axiosInstance.delete(`follow/${userId}`)
            .then(response => response.data);
    },
};

export const authenticationApi = {
    loginByCookie : () => {
        return  axiosInstance.get(`auth/me`)
            .then(response => {
                return response.data
            });
    },
    loginByCredentials : (email,password, rememberMe = false) => {
        return  axiosInstance.post(`auth/login`, {email,password,rememberMe})
            .then(response => {
                return response.data
            });
    },
    logout : () => {
        return  axiosInstance.delete(`auth/login`)
            .then(response => {
                return response.data
            });
    }
}

