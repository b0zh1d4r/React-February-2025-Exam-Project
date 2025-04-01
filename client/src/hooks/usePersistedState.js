import { useState, useEffect } from "react";
import requester from "../api/requester.js";

// Custom hook to persist state in localStorage
export default function usePersistedState(key, initialState) {
    // State initialization: check if data exists in localStorage, if not, use the initialState:
    const [state, setState] = useState(() => {
        const persistedAuth = localStorage.getItem(key); // Check if data exists in localStorage
        if (!persistedAuth) {
            return initialState; // If no data in localStorage, return the initialState.
        }

        return JSON.parse(persistedAuth); // Parse and return the persisted data.
    });

    // Effect hook to fetch user data and update the localStorage if available:
    useEffect(() => {
        async function fetchUser() {
            const user = await requester.get("http://localhost:8888/users/me"); // Fetch user data from API.
            if (user) { 
                setState(user); // If user is found, update state and persist it in localStorage.
                localStorage.setItem(key, JSON.stringify(user)); // Store user data in localStorage.
            } else {
                setState(null); // If no user data is found, reset the state.
                localStorage.removeItem(key); // Remove persisted data from localStorage.
            }
        }
        fetchUser(); // Call the fetchUser function when the component mounts or key changes.
    }, [key]); // Dependency on the `key`, so effect runs again if key changes.

    // Function to update the state and persist the value in localStorage.
    const updateState = (value) => {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value)); // Store value in localStorage.
        } else {
            localStorage.removeItem(key); // Remove the item from localStorage if value is falsy.
        }
        setState(value); // Update the state with the new value.
    };

    return [state, updateState]; // Return the state and the update function.
}
