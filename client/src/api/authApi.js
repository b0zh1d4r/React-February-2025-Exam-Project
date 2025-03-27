import requester from "./requester.js";

const BASE_URL = "http://localhost:8888/auth";
const ME_URL = "http://localhost:8888/users"

export const login = (email, password) => {
    return requester.post(`${BASE_URL}/login`, { email, password });
};

export const register = (username, email, phoneNumber, location, password, repeatPassword) => {
    return requester.post(`${BASE_URL}/register`, { username, email, phoneNumber, location, password, repeatPassword });
};

export const logout = () => {
    return requester.get(`${BASE_URL}/logout`);
};

export const getUserById = async (userId) => {
    try {
        const user = await requester.get(`${ME_URL}/${userId}`);
        return user;
    } catch (error) {
        throw new Error("Error fetching user.");
    }
};
