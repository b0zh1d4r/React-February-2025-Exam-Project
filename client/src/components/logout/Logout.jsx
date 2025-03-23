import { useEffect } from "react";
import { useLogout } from "../../api/authApi";
import { useNavigate } from "react-router";

export default function Logout() {
    const navigate = useNavigate();
    const logout = useLogout();

    useEffect(() => {
        const handleLogout = async () => {
            await logout();
            navigate("/");
        };

        handleLogout();
    }, [logout, navigate]);
}
