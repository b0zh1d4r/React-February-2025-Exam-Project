import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router"

export default function GuestGuard ({children}) {
    const { isAuthenticated } = useContext(AuthContext)

    if(isAuthenticated){
        return <Navigate to="/" />
    }

    return (
        <>
            {children}
        </>
    )
}