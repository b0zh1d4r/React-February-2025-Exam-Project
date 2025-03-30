import { Link } from "react-router";

export default function TopVehicle({ _id, name, price, imageUrl, userList}) {
    return (
        <>
            <div className="vehicle-card">
                <img src={imageUrl} alt={name} />
                <h3>{name}</h3>
                <p className="price">${price}</p>
                <Link to={`/vehicles/${_id}`} className="read-more-btn">Read More</Link>
            </div>
        </>
    )
}