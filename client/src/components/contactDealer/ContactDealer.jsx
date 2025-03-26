import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserById } from "../../api/authApi";

export default function ContactDealer() {
    const { ownerId } = useParams();
    const [dealer, setDealer] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDealerInfo = async () => {
            try {
                const data = await getUserById(ownerId);
                setDealer(data);
                
            } catch (err) {
                setError("Failed to fetch dealer's information.");
            } finally {
                setLoading(false);
            }
        };

        if (ownerId) {
            fetchDealerInfo();
        }
    }, [ownerId]);
    

    return (
        <div className="about-container">
            <h2>Dealer's Information:</h2>
            <p>Full Name: <span className="highlight">{dealer?.username || "N/A"}</span></p>
            <p>Email: <a href={`mailto:${dealer?.email}`}><span className="highlight">{dealer?.email || "N/A"}</span></a></p>
            <p>Phone Number: <span className="highlight">{dealer?.phoneNumber || "N/A"}</span></p>
            <p>Location: <span className="highlight">{dealer?.location || "N/A"}</span></p>
        </div>
    );
};
