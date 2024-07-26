import axios from "axios";
import { toast } from 'react-toastify';

// Function to get headers with token
const getHeaders = () => {
    const userData =
        JSON.parse(localStorage.getItem("user") || 'null') ||
        JSON.parse(sessionStorage.getItem("user") || 'null');
    const token = userData?.token;

    let headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Platform: 'dashboard',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

// Create Axios instance
export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/',
});


axiosInstance.interceptors.request.use((request: any) => {
    request.headers = { ...request.headers, ...getHeaders() };
    return request;
});

// Response interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);
        
        let errorMsg = "";
        if (error?.response?.status === 401) {
            errorMsg = "Unauthorized access - please login."
        } else if (error?.message === "Network Error") {
            // Handle network errors
            errorMsg = "Network error - please check your connection."
        } else {
            // Handle other errors
            errorMsg = error.response.data.message || "An unexpected error occured!"
        }
        toast.error(errorMsg)
        return Promise.reject(error);
    }
);
