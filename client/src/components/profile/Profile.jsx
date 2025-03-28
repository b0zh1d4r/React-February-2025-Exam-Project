import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getUserById } from "../../api/authApi";
import { getOne } from "../../api/vehicleApi";
import VehicleProfile from "./vehicleProfile/VehicleProfile";

export default function Profile() {
    const { userId } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState(null);

    const fetchUserDetails = useCallback(async () => {
        try {
            const data = await getUserById(userId + `?timestamp=${new Date().getTime()}`); // Force fresh data
            setUserDetails(data);

            if (data?.vehicles?.length) {
                const vehiclePromises = data.vehicles.map((vehicleId) =>
                    getOne(vehicleId + `?timestamp=${new Date().getTime()}`) // Avoid caching
                );
                const vehiclesData = await Promise.all(vehiclePromises);

                // Filter out null or undefined vehicles
                const filteredVehicles = vehiclesData.filter(vehicle => vehicle?.item);
                setVehicles(filteredVehicles);
            } else {
                setVehicles([]);
            }
        } catch (error) {
            setError("Failed to fetch user details or vehicles.");
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchUserDetails();
            const interval = setInterval(fetchUserDetails, 10000); // Auto-refresh every 10s
            return () => clearInterval(interval);
        }
    }, [userId, fetchUserDetails]);

    if (error) {
        return <h2>{error}</h2>;
    }
    

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-image">
                    <img src="/profile.png" alt="Profile" />
                </div>
                <div className="profile-info">
                    <h1>{userDetails?.username}</h1>
                    <p>Vehicles Dealer @GaragiX</p>
                </div>
            </div>
            <div className="profile-details">
                <h2>Contact Information:</h2>
                <ul>
                    <li><strong>ID:</strong> {userDetails?._id}</li>
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
    );
}
