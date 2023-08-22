import axios from "axios";

const axiosInstance = axios.create({
        withCredentials : true,
        baseURL : "https://social-network.samuraijs.com/api/1.0/",
        headers: {
            "API-KEY": "f5abb6c8-36a9-4b47-b647-ba4073"
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
    },
    uploadPhoto : (file) => {
        let formData = new FormData();
        formData.append("image", file);
        return axiosInstance.put(`profile/photo`, formData, {headers:{"Content-Type" : "multipart/form-data"}})
            .then(response =>{
                return response.data
            });
    },
    saveProfileData : (data) => {
       return  axiosInstance.put(`profile`, data)
            .then(response =>{
                return  response.data
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
    loginByCredentials : (email,password, rememberMe = false, captcha = null) => {
        return  axiosInstance.post(`auth/login`, {email,password,rememberMe,captcha})
            .then(response => {
                if(captcha !== null){
                    debugger;
                }
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

export const securityApi = {
    getCaptcha : () => {
        return axiosInstance.get(`security/get-captcha-url`)
            .then(response => {
                return response.data
            });
    }
}

