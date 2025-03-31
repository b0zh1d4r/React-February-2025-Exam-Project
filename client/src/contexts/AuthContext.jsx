import { createContext, useEffect } from "react";
import requester from "../api/requester.js";
import usePersistedState from "../hooks/usePersistedState.js";

export const AuthContext = createContext({
    userId: "",
    email: "",
    username: "",
    phoneNumber: "",
    location: "",
    isAuthenticated: false,
    changeAuthState: () => null,
    logout: () => null,
});

export function AuthContextProvider({ children }) {
    const [authState, setAuthState] = usePersistedState("auth", null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await requester.get("http://localhost:8888/users/me");
                setAuthState(user);
            } catch {
                setAuthState(null);
            }
        };
        fetchUser();
    }, [setAuthState]);

    const changeAuthState = (state) => {
        setAuthState(state);
    };

    const logout = async () => {
        try {
            await requester.get("http://localhost:8888/auth/logout");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setAuthState(null);
        }
    };

    const contextData = {
        userId: authState?._id || "",
        email: authState?.email || "",
        username: authState?.username || "",
        phoneNumber: authState?.phoneNumber || "",
        location: authState?.location || "",
        isAuthenticated: Boolean(authState?.email),
        changeAuthState,
        logout,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}