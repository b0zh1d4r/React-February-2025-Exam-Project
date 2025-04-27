import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserById } from "../../api/authApi";
import ErrorNotification from "../errorNotification/ErrorNotification.jsx";

export default function ContactDealer() {
    const { dealerId } = useParams(); // Retrieve dealerId from the URL parameters.
    
    // State variables for dealer information and potential errors:
    const [dealer, setDealer] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        if (!dealerId) return; // If there's no dealerId, exit early.

        const fetchDealerInfo = async () => {
            try {
                const data = await getUserById(dealerId);
                setDealer(data);
                setError(""); // Clear any existing error.
            } catch {
                // Handle request failure:
                setError("Failed to fetch dealer's information.");
                setDealer({}); // Reset dealer data.
            }
        };

        fetchDealerInfo(); // Invoke the async function.
    }, [dealerId]); // Re-run the effect when dealerId changes.

    return (
        <>
            {error && <ErrorNotification message={error} clearError={() => setError("")} />}
            
            <div className="about-container">
                <h2>Dealer's Information:</h2>
                <p>Username: <span className="highlight">{dealer?.username || "N/A"}</span></p>
                <p>Email: 
                    <a href={`mailto:${dealer?.email}`}>
                        <span className="highlight">{dealer?.email || "N/A"}</span>
                    </a>
                </p>
                <p>Phone Number: <span className="highlight">{dealer?.phoneNumber || "N/A"}</span></p>
                <p>Location: <span className="highlight">{dealer?.location || "N/A"}</span></p>
            </div>
        </>
    );
}