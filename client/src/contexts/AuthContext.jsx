import { createContext, useEffect } from "react";
import requester from "../api/requester.js";
import usePersistedState from "../hooks/usePersistedState.js";

// Create a context for authentication that will provide the current user's data:
export const AuthContext = createContext({
    userId: "",
    email: "",
    username: "",
    phoneNumber: "",
    location: "",
    isAuthenticated: false, // Whether the user is authenticated or not.
    changeAuthState: () => null, // Function to change the authentication state.
    logout: () => null, // Function to log out the user.
});

export function AuthContextProvider({ children }) {
    const [authState, setAuthState] = usePersistedState("auth", null); // State to hold the authenticated user's data.

    useEffect(() => {
        // Fetch the current user data from the server:
        const fetchUser = async () => {
            try {
                const user = await requester.get("http://localhost:8888/users/me");
                setAuthState(user); // Set the user data to the state".
            } catch {
                setAuthState(null); // If there's an error, set the user state to null.
            }
        };
        fetchUser(); // Call the function to fetch user data.
    }, []);

    // Function to update the authentication state:
    const changeAuthState = (state) => {
        setAuthState(state); // Update the authentication state.
    };

    // Function to log the user out:
    const logout = async () => {
        try {
            await requester.get("http://localhost:8888/auth/logout");
        } catch (error) {
            console.error("Logout failed:", error);2
        } finally {
            setAuthState(null); // Clear the user state after logging out.
        }
    };

    // Prepare the context data to be provided to other components:
    const contextData = {
        userId: authState?._id || "",
        email: authState?.email || "",
        username: authState?.username || "",
        phoneNumber: authState?.phoneNumber || "",
        location: authState?.location || "",
        isAuthenticated: Boolean(authState?.email), // Determine if the user is authenticated based on their email.
        changeAuthState, // Function to change auth state.
        logout, // Function to log out the user.
    };

    // Provide the context data to the children components:
    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}
