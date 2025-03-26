import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getUserById } from "../../api/authApi"; // Fetch user by ID
import VehicleProfile from "./vehicleProfile/VehicleProfile"; // Import the VehicleProfile component
import { useGetOneVehicle } from "../../hooks/useService"; // Import the custom hook

export default function Profile() {
    const { userId } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(null);
    const [vehicles, setVehicles] = useState([]); // State for vehicles
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await getUserById(userId);
                setUserDetails(data);

                if (data?.vehicles?.length) {
                    const vehiclePromises = data.vehicles.map((vehicleId) => useGetOneVehicle(vehicleId));
                    const vehiclesData = await Promise.all(vehiclePromises);
                    setVehicles(vehiclesData);
                }
            } catch (error) {
                setError("Failed to fetch user details or vehicles.");
            }
        };

        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

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
                <h2>All Available Vehicles:</h2>
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <VehicleProfile key={vehicle?._id} {...vehicle} />
                    ))
                ) : (
                    <h2>No Vehicles Available yet!</h2>
                )}
            </div>
        </div>
    );
}
