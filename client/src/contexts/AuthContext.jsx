import { createContext, useEffect } from "react";
import requester from "../api/requester.js"; 
import usePersistedState from "../hooks/usePersistedState.js";

export const AuthContext = createContext({
    userId: '',
    email: '',
    isAuthenticated: false,
    changeAuthState: () => null,
    logout: () => null
});

export function AuthContextProvider({ children }) {
    const [authState, setAuthState] = usePersistedState('auth', null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await requester.get("http://localhost:8888/me"); 
                setAuthState(user);

            } catch {
                setAuthState(null); 
            }
        }
        fetchUser();
    }, []);

    const changeAuthState = (state) => {
        setAuthState(state); 
    };

    const logout = async () => {
        await requester.get("http://localhost:8888/auth/logout"); 
        setAuthState(null);
    };

    const contextData = {
        userId: authState?._id,
        email: authState?.email,
        isAuthenticated: !!authState?.email,
        changeAuthState,
        logout
    };


    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}