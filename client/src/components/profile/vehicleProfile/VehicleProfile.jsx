import { Link } from "react-router";

export default function VehicleProfile({ _id, name, price, imageUrl }) {
    return (
        <>
            <div className="vehicle-item">
                <img src={imageUrl} alt="Vehicle Model 1" />
                <p><strong>{name}</strong> - ${price}</p>
                <Link to={`/vehicles${_id}`} className="read-more-btn">Read More</Link>
            </div>
        </>
    )
}