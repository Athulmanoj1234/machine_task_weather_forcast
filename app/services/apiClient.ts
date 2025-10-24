import { weatherbaseApi } from "@/constant/urls";
import axios from "axios";

axios.defaults.timeout = 15000;

const RootUrl = weatherbaseApi;
const baseURL = RootUrl;

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = "YOUR_AUTH_TOKEN"; 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
