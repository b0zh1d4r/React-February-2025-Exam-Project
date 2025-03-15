import React, { useState, useEffect } from "react";
import "../../App.css";

const Notification = ({message}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <div
            className={`notification-container ${isVisible ? "show" : ""} error`}
            onClick={handleClose}
        >
            <h3>Error</h3>
            <p>Something went wrong!</p>
            <div className="highlight">Click to dismiss</div>
        </div>
    );
};

export default Notification;