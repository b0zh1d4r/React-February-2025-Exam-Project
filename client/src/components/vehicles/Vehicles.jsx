import { useState, useEffect } from "react";
import { useGetAllVehicles } from "../../hooks/useService.js";
import Vehicle from "./vehicle/Vehicle.jsx";
import ErrorNotification from "../errorNotification/ErrorNotification.jsx";

export default function Catalog() {
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("most-popular");
    const [searchQuery, setSearchQuery] = useState("");

    const [vehicles, setVehicles] = useGetAllVehicles();

    useEffect(() => {
        if (!vehicles) {
            setError("Failed to fetch vehicles. Please try again later.");
        }
    }, [vehicles]);

    const sortVehicles = (vehicles, sortBy) => {
        switch (sortBy) {
            case "best-rating":
                return [...vehicles].sort((a, b) => b.userList.length - a.userList.length);
            case "price-low-high":
                return [...vehicles].sort((a, b) => a.price - b.price);
            case "price-high-low":
                return [...vehicles].sort((a, b) => b.price - a.price);
            default:
                return [...vehicles].sort((a, b) => new Date(b.year) - new Date(a.year));
        }
    };

    const filterVehicles = (vehicles, query) => {
        return vehicles.filter(vehicle => {
            const name = vehicle.name ? vehicle.name.toLowerCase() : '';
            const model = vehicle.model ? vehicle.model.toLowerCase() : '';
            return name.includes(query.toLowerCase()) || model.includes(query.toLowerCase());
        });
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredVehicles = filterVehicles(vehicles, searchQuery);
    const sortedVehicles = sortVehicles(filteredVehicles, sortBy);

    const clearError = () => {
        setError(null);
    };

    return (
        <>
            {error && <ErrorNotification message={error} clearError={clearError} />} 

            <section className="top-vehicles">
                <h2>All Our Vehicles: </h2>
                <form action="search-results.html" method="GET" className="search-form">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search for Cars..."
                        required
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button type="submit">Search</button>
                </form>
                <br />

                <div className="sort-by-container">
                    <label htmlFor="sort-by">Sort By: </label>
                    <select id="sort-by" name="sort-by" value={sortBy} onChange={handleSortChange}>
                        <option value="best-rating">Best Rating</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                    </select>
                </div>

                <div className="vehicles-container">
                    {sortedVehicles.length ? (
                        sortedVehicles.map(vehicle => <Vehicle key={vehicle._id} {...vehicle} />)
                    ) : (
                        <h2>No Vehicles Available yet!</h2>
                    )}
                </div>
            </section>
        </>
    );
};
