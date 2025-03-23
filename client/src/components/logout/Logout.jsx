import { useEffect } from "react";
import { useLogout } from "../../hooks/useAuth";
import { Navigate } from "react-router";

export default function Logout() {
    const logout = useLogout();

    useEffect(() => {
        logout();

    }, [logout]);

    return <Navigate to="/" />;
}