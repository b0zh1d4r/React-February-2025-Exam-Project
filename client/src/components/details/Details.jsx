import { useGetOneVehicle } from "../../hooks/useService";
import { like, remove } from "../../api/vehicleApi";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate, useParams } from "react-router";

export default function Details() {
    const { vehicleId } = useParams();
    const [data] = useGetOneVehicle(vehicleId);
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const vehicle = data?.item || {};
    const isOwner = data?.item?.owner === userId;

    // Initialize isLiked based on whether userId is in the userList
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (vehicle.userList && userId) {
            setIsLiked(vehicle.userList.includes(userId));
        }
    }, [vehicle.userList, userId]);

    const vehicleLikeHandler = async () => {
        try {
            await like(vehicleId);
            setIsLiked(true);
        } catch (err) {
            console.log(err.message);
        }
    };

    const vehicleDeleteHandler = async () => {
        const confirmDelete = window.confirm("Are you sure?");
        if (!confirmDelete) return;
    
        try {
            await remove(vehicleId);
            navigate('/vehicles');
        } catch (err) {
            console.error(err.message);
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
                    <p className="description">Likes: {vehicle.userList?.length || 0}</p>

                    {!isOwner && (
                        <Link to={`/vehicles/contact-dealer/${data?.item?.owner}`} className="contact-btn">Contact Dealer</Link>
                    )}

                    {isOwner ? (
                        <>
                            <Link to={`/vehicles/${vehicleId}/edit`} className="edit-btn">Edit</Link>
                            <button onClick={vehicleDeleteHandler} className="delete-btn">Delete</button>
                        </>
                    ) : (
                        userId && !isLiked && (
                            <button onClick={vehicleLikeHandler} className="like-btn">Like</button>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
