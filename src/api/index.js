import Axios from "axios";
import { API_SERVER } from "../config/constant";

console.log(API_SERVER, "API_SERVER +++++++++++++++++++++=");
const axios = Axios.create({
    baseURL: `${API_SERVER}`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

axios.interceptors.request.use(
    (config) => {
        return Promise.resolve(config);
    },
    (error) => Promise.reject(error),
);

axios.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
        console.log(error);
        debugger;

        if (error.response && error.response.status === 401) {
            // //   // Clear token and redirect to login
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
            window.location.href = "/login"; // or use a router push method if you are using a router
            // // }
            // window.location.href = "/forbidden"; // or use a router push method if you are using a router
        }

        if (error.response && error.response.status === 403) {
            // debugger
            // Redirect to forbidden page
            window.location.href = "/forbidden"; // or use a router push method if you are using a router
        }
        return Promise.reject(error);
    },
);

export const setupAxiosInterceptors = (token) => {
    axios.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => Promise.reject(error),
    );
};

export default axios;
