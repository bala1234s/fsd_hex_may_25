import axios from "axios";

const API_URL = "http://localhost:8080/api/policy";

export const fetchAllPolicies = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching policies:", error);
        throw error;
    }
};