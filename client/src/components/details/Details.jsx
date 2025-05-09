import { useGetOneVehicle } from "../../hooks/useService";
import { like, remove, undoLike } from "../../api/vehicleApi";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate, useParams } from "react-router";
import ErrorNotification from "../errorNotification/ErrorNotification";

export default function Details() {
    const { vehicleId } = useParams();
    const [data] = useGetOneVehicle(vehicleId); // Fetch vehicle data.
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const vehicle = data?.item || {};
    const isOwner = vehicle.owner === userId;

    // State to track like status and count
    const [isLiked, setIsLiked] = useState(vehicle.userList?.includes(userId) || false);
    const [likeCount, setLikeCount] = useState(vehicle.userList?.length || 0);
    const [error, setError] = useState(null);

    // Update the like status and count when vehicle data changes
    useEffect(() => {
        setIsLiked(vehicle.userList?.includes(userId) || false);
        setLikeCount(vehicle.userList?.length || 0);
    }, [vehicle.userList, userId]);

    // Handle liking the vehicle
    const handleLike = async () => {
        try {
            await like(vehicleId);
            setIsLiked(true);
            setLikeCount(prev => prev + 1); // Increase like count
        } catch (err) {
            setError("Failed to like the vehicle.");
            console.error(err.message);
        }
    };

    // Handle undo like the vehicle
    const handleUndoLike = async () => {
        try {
            await undoLike(vehicleId);
            setIsLiked(false);
            setLikeCount(prev => Math.max(0, prev - 1)); // Decrease like count
        } catch (err) {
            setError("Failed to unlike the vehicle.");
            console.error(err.message);
        }
    };

    // Handle deleting the vehicle
    const handleDelete = async () => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await remove(vehicleId);
            alert("Vehicle has been deleted successfully.");
            navigate("/vehicles");
        } catch (err) {
            setError("Failed to delete the vehicle.");
            console.error(err.message);
        }
    };

    return (
        <>
            {error && <ErrorNotification message={error} clearError={() => setError(null)} />}

            <section className="vehicle-details">
                <h2>Vehicle Details:</h2>
                <div className="vehicle-container">
                    <div className="vehicle-card">
                        <img src={vehicle.imageUrl} alt={vehicle.name} />
                        <h3>{vehicle.name}</h3>
                        <p className="price">${vehicle.price}</p>
                        <p className="description">{vehicle.description}</p>
                        <p className="description">Year: <span className="others">{vehicle.year}</span></p>
                        <p className="description">Engine: <span className="others">{vehicle.engine}</span></p>
                        <p className="description">Condition: <span className="others">{vehicle.condition}</span></p>
                        <p className="description">Transmission: <span className="others">{vehicle.transmission}</span></p>
                        <p className="description">Likes: <span className="others">{likeCount}</span></p>

                        {!isOwner && (
                            <Link to={`/vehicles/contact-dealer/${data?.item?.owner}`} className="contact-btn">Contact Dealer</Link>
                        )}

                        {isOwner ? (
                            <>
                                <Link to={`/vehicles/${vehicleId}/edit`} className="edit-btn">Edit</Link>
                                <button onClick={handleDelete} className="delete-btn">Delete</button>
                            </>
                        ) : (
                            userId && (
                                isLiked ? (
                                    <button onClick={handleUndoLike} className="like-btn">Undo Like</button>
                                ) : (
                                    <button onClick={handleLike} className="like-btn">Like</button>
                                )
                            )
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
