import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

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

// 🔹 User Login
export const login = async (email, password) => {
    return apiRequest("POST", "login", { email, password });
};

// 🔹 User Registration
export const register = async (userData) => {
    return apiRequest("POST", "register", userData);
};

