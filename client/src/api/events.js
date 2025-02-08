import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://event-management-server-v6v9.onrender.com";

export const getEvents = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await axios.get(`${API_URL}/api/event?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

export const createEvent = async (eventData, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/event`, eventData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

export const getEventById = async (eventId) => {
    try {
        const response = await axios.get(`${API_URL}/api/event/${eventId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching event:", error);
        throw error;
    }
};

export const updateEvent = async (eventId, updatedData, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/event/${eventId}`, updatedData, {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};


export const deleteEvent = async (eventId, token) => {
    try {
        await axios.delete(`${API_URL}/api/event/${eventId}`, {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });
        return { success: true, message: "Event deleted successfully" };
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
};

export const attendEvent = async (eventId, userId, token) => {
    const response = await fetch(`${API_URL}/api/attendee`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId, userId }),
    });

    if (!response.ok) {
        throw new Error("Failed to attend event");
    }

    return response.json();
};

export const getEventByUser = async (userId) => {
    try {
        console.log(userId)
        const response = await axios.get(`${API_URL}/api/attendee/user/${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching attendees:", error);
        return [];
    }
};

export const getUserByEvent = async (eventId) => {
    try {
        const response = await axios.get(`${API_URL}/api/attendee/event/${eventId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching attendees:", error);
        return [];
    }
};

