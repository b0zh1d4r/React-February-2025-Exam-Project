import { useGetOneVehicle } from "../../hooks/useService";
import { like, remove } from "../../api/vehicleApi";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate, useParams } from "react-router";
import ErrorNotification from "../errorNotification/ErrorNotification";

export default function Details() {
    const { vehicleId } = useParams();
    const [data] = useGetOneVehicle(vehicleId);
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const vehicle = data?.item || {};
    const isOwner = vehicle.owner === userId;
    const [isLiked, setIsLiked] = useState(vehicle.userList?.includes(userId) || false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLiked(vehicle.userList?.includes(userId) || false);
    }, [vehicle.userList, userId]);

    const handleLike = async () => {
        try {
            await like(vehicleId);
            setIsLiked(true);
        } catch (err) {
            setError("Failed to like the vehicle.");
            console.error(err.message);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await remove(vehicleId);
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
                        <p className="description">Likes: <span className="others">{vehicle.userList?.length || 0}</span></p>

                        {!isOwner && (
                            <Link to={`/vehicles/contact-dealer/${data?.item?.owner}`} className="contact-btn">Contact Dealer</Link>
                        )}

                        {isOwner ? (
                            <>
                                <Link to={`/vehicles/${vehicleId}/edit`} className="edit-btn">Edit</Link>
                                <button onClick={handleDelete} className="delete-btn">Delete</button>
                            </>
                        ) : (
                            userId && !isLiked && (
                                <button onClick={handleLike} className="like-btn">Like</button>
                            )
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
