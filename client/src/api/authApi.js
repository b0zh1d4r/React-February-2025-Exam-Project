import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import request from "../utils/request";

const baseUrl = "http://localhost:8888/auth";

export const useLogin = () => {
    const login = async (email, password) => {
        return await request.post(`${baseUrl}/login`, { email, password });
    };

    return { login };
};

export const useRegister = () => {
    const register = async (username, email, phoneNumber, location, password, repeatPassword) => {
        return await request.post(`${baseUrl}/register`, { username, email, phoneNumber, location, password, repeatPassword });
    };

    return { register };
};

export const useLogout = () => {
    const { userLogoutHandler } = useContext(UserContext);

    const logout = async () => {
        try {
            const response = await fetch(`${baseUrl}/logout`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                userLogoutHandler();
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return logout;
};

