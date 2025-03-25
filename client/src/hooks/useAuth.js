import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { login, logout, register } from "../api/authApi";


export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext);

    const loginHandler = async (email, password) => {
        const result = await login(email, password); 
        
        changeAuthState(result); 
    };

    return loginHandler;
};

export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext);

    const registerHandler = async (username, email, phoneNumber, location, password, repeatPassword) => {
        const result = await register(username, email, phoneNumber, location, password, repeatPassword); 
        changeAuthState(result); 
    };

    return registerHandler;
};

export const useLogout = () => {
    const { logout: localLogout } = useContext(AuthContext);

    const logoutHandler = async () => {
        await logout();  
        localLogout();  
    };

    return logoutHandler;
};