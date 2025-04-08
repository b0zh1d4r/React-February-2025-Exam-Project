import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getUserById } from "../../api/authApi";
import { getOne } from "../../api/vehicleApi";
import VehicleProfile from "./vehicleProfile/VehicleProfile";
import ErrorNotification from "../errorNotification/ErrorNotification";

export default function Profile() {
    const { userId } = useContext(AuthContext); // Get userId from AuthContext to fetch user-specific data.
    const [userDetails, setUserDetails] = useState(null); // State to store user details.
    const [vehicles, setVehicles] = useState([]); // State to store user's vehicles.
    const [error, setError] = useState(null); // State to store error messages.

    // useCallback hook to prevent re-fetching user details unless userId changes:
    const fetchUserDetails = useCallback(async () => {
        try {
            // Fetch user data based on userId:
            const data = await getUserById(`${userId}?timestamp=${Date.now()}`);
            setUserDetails(data); // Store user details in state.

            // If the user has vehicles, fetch each vehicle's data:
            if (data?.vehicles?.length) {
                const vehiclesData = await Promise.all(
                    data.vehicles.map(vehicleId => getOne(`${vehicleId}?timestamp=${Date.now()}`))
                );
                // Filter out any undefined or null vehicles:
                setVehicles(vehiclesData.filter(vehicle => vehicle?.item));
            } else {
                setVehicles([]); // If no vehicles, set empty array.
            }
        } catch (err) {
            // Handle errors and set an error message:
            setError("Failed to fetch user details or vehicles.");
            console.error(err);
        }
    }, [userId]);

    // useEffect hook to fetch user details and vehicle data on mount, and every 10 seconds thereafter:
    useEffect(() => {
        if (!userId) return; // If userId is not available, do nothing.
        fetchUserDetails(); // Fetch user details and vehicles initially.
        const interval = setInterval(fetchUserDetails, 10000); // Refetch every 10 seconds.
        return () => clearInterval(interval); // Clean up interval on component unmount.
    }, [userId, fetchUserDetails]);

    return (
        <>
            {error && <ErrorNotification message={error} clearError={() => setError('')} />}

            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-image">
                        <img src="/profile.png" alt="Profile" />
                    </div>
                    <div className="profile-info">
                        <h1>{userDetails?.username}</h1>
                        {vehicles.length > 0 ? (
                            <p>Vehicle Dealer @ Garagix</p>
                        ) : (
                            <p>User @ GaragiX</p>
                        )}
                    </div>
                </div>

                <div className="profile-details">
                    <h2>Contact Information:</h2>
                    <ul>
                        <li><strong>Email:</strong> {userDetails?.email}</li>
                        <li><strong>Phone Number:</strong> {userDetails?.phoneNumber}</li>
                        <li><strong>Location:</strong> {userDetails?.location}</li>
                    </ul>
                </div>

                <div className="profile-vehicles">
                    <h2>All Your Vehicle Listings:</h2>
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle) => (
                            <VehicleProfile key={vehicle?.item?._id} {...vehicle?.item} />
                        ))
                    ) : (
                        <h2>You Have No Vehicle Listings!</h2>
                    )}
                </div>
            </div>
        </>
    );
}
