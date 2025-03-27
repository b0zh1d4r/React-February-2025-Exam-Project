import { useGetOneVehicle } from "../../hooks/useService";
import { like, remove } from "../../api/vehicleApi";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate, useParams } from "react-router";

export default function Details() {
    const [isLiked, setIsLiked] = useState(false);
    const { vehicleId } = useParams();
    const [data] = useGetOneVehicle(vehicleId);

    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const vehicle = data?.item || {};
    const isOwner = data?.item?.owner === userId;
        
    const vehicleLikeHandler = async () => {
        try {
            await like(vehicleId);
            setIsLiked(true);
        } catch (err) {
            console.log(err.message);
        }
    };

    const vehicleDeleteHandler = async () => {
        try {
            await remove(vehicleId);
            navigate(`/catalog`);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <section className="vehicle-details">
            <h2>Vehicle Details:</h2>
            <div className="vehicle-container">
                <div className="vehicle-card">
                    <img src={vehicle.imageUrl} alt={vehicle.name} />
                    <h3>{vehicle.name}</h3>
                    <p className="price">${vehicle.price}</p>
                    <p className="description">{vehicle.description}</p>
                    <p className="description">Year: {vehicle.year}</p>
                    <p className="description">Engine Type: {vehicle.engine}</p>
                    <p className="description">Condition: {vehicle.condition}</p>
                    <p className="description">Transmission: {vehicle.transmission}</p>
                    <p className="description">Likes: {vehicle.likes || 0}</p>

                    {!isOwner && (
                        <Link to={`/vehicles/contact-dealer/${data?.item?.owner}`} className="contact-btn">Contact Dealer</Link>
                    )}

                    {isOwner ? (
                        <>
                            <Link to={`/edit/${vehicleId}`} className="edit-btn">Edit</Link>
                            <button onClick={vehicleDeleteHandler} className="delete-btn">Delete</button>
                        </>
                    ) : (
                        userId && (
                            isLiked ? (
                                <p className="like-btn">You have already liked this vehicle!</p>
                            ) : (
                                <button onClick={vehicleLikeHandler} className="like-btn">Like</button>
                            )
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
