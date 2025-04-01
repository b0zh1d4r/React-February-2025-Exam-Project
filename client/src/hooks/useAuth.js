import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { login, logout, register } from "../api/authApi";

// Custom hook for handling login:
export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext); // Access the changeAuthState function from the AuthContext.

    const loginHandler = async (email, password) => {
        const result = await login(email, password);

        changeAuthState(result); // Update the authentication state with the result of the login API.
    };

    return loginHandler;
};

// Custom hook for handling registration:
export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext); // Access the changeAuthState function from the AuthContext.

    const registerHandler = async (username, email, phoneNumber, location, password, repeatPassword) => {
        const result = await register(username, email, phoneNumber, location, password, repeatPassword);
        
        changeAuthState(result); // Update the authentication state with the result of the register API.
    };

    return registerHandler;
};

// Custom hook for handling logout:
export const useLogout = () => {
    const { logout: localLogout } = useContext(AuthContext); // Access the logout function from the AuthContext

    const logoutHandler = async () => {
        await logout(); 

        localLogout(); // Call the logout function from the AuthContext to update the local state.

    };

    return logoutHandler;
};
