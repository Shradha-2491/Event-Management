import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://event-management-server-v6v9.onrender.com";

const apiRequest = async (method, endpoint, data = null) => {
    try {
        const response = await axios({
            method,
            url: `${API_URL}/api/auth/${endpoint}`,
            data,
        });
        return response.data;
    } catch (error) {
        let errorMessage = "Something went wrong. Please try again.";

        if (error.response) {
            errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
            errorMessage = "Server is not responding. Please check your internet connection.";
        } else {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};


export const login = async (email, password) => {
    return apiRequest("POST", "login", { email, password });
};


export const register = async (userData) => {
    return apiRequest("POST", "register", userData);
};

