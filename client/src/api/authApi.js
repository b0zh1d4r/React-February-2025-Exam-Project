import { useContext, useEffect, useRef } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:8888/auth';

export const useLogin = () => {
    const abortRef = useRef(new AbortController());

    const login = async (email, password) => {
        const result = await request.post(`${baseUrl}/login`, { email, password }, { signal: abortRef.current.signal });

        return result;
    }

    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort();
    }, []);

    return {
        login
    }
};

export const useRegister = () => {
    const abortRef = useRef(new AbortController());

    const register = async (username, email, phoneNumber, location, password, repeatPassword) => {

        const result = await request.post(`${baseUrl}/register`, { username, email, phoneNumber, location, password, repeatPassword }, { signal: abortRef.current.signal })

        return result;
    }

    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort();
    }, []);

    return {
        register
    }
};

export const useLogout = () => {
    const { accessToken } = useContext(UserContext);
    
    const options = {
        headers: {
            'X-Authorization': accessToken
        }
    }
    const logout = () => request.get(`${baseUrl}/logout`, null, options)

    return {
        logout
    }
}