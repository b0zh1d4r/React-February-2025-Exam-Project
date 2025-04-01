import React, { useEffect, useState } from "react";
import "../../App.css";

const ErrorNotification = ({ message, clearError }) => {
    // State to control the visibility of the error notification:
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true); // Show the notification when there is an error message.
            
            // Automatically hide the notification after 3 seconds:
            const timer = setTimeout(() => {
                setIsVisible(false);
                clearError(); // Clear the error message after hiding the notification.
            }, 3000);
            
            return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or updates.
        }
    }, [message]); // Re-run the effect whenever the message changes.

    // If the notification is not visible, do not render anything:
    if (!isVisible) return null;

    return (
        <div className="notification-container show error" onClick={clearError}>
            <p>{message}</p> {/* Display the error message. */}
        </div>
    );
};

export default ErrorNotification;