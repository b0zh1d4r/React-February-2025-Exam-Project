import React, { useEffect, useState } from "react";
import "../../App.css";

const ErrorNotification = ({ message, clearError }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                clearError();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!isVisible) return null;

    return (
        <div className="notification-container show error" onClick={clearError}>
            <p>{message}</p>
        </div>
    );
};

export default ErrorNotification;
