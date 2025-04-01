import { useState, useEffect } from "react";
import { useGetAllVehicles } from "../../hooks/useService.js";
import Vehicle from "./vehicle/Vehicle.jsx";
import ErrorNotification from "../errorNotification/ErrorNotification.jsx";

export default function Catalog() {
    // State for handling errors:
    const [error, setError] = useState(null);

    // State for sorting (default: "best-rating"):
    const [sortBy, setSortBy] = useState("best-rating");

    // State for search input:
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch all vehicles using a custom hook:
    const [vehicles] = useGetAllVehicles();

    // State to store sorted and filtered vehicles:
    const [sortedVehicles, setSortedVehicles] = useState([]);

    // Effect hook to update the vehicle list when vehicles, sorting, or search query changes:
    useEffect(() => {
        if (!vehicles) {
            setError("Failed to fetch vehicles. Please try again later."); // Handle fetch failure.
        } else {
            // First, filter vehicles based on search query, then sort them accordingly.
            setSortedVehicles(sortVehicles(filterVehicles(vehicles, searchQuery), sortBy));
        }
    }, [vehicles, sortBy, searchQuery]); // Dependencies: runs whenever vehicles, sortBy, or searchQuery changes.

    // Function to sort vehicles based on the selected sorting option:
    const sortVehicles = (vehicles, sortBy) => {
        switch (sortBy) {
            case "best-rating":
                return [...vehicles].sort((a, b) => b.userList.length - a.userList.length); // Sort by number of likes (descending).
            case "price-low-high":
                return [...vehicles].sort((a, b) => a.price - b.price); // Sort by price (low to high).
            case "price-high-low":
                return [...vehicles].sort((a, b) => b.price - a.price); // Sort by price (high to low).
            default:
                return [...vehicles].sort((a, b) => new Date(b.year) - new Date(a.year)); // Sort by year (newest first).
        }
    };

    // Function to filter vehicles based on the search query:
    const filterVehicles = (vehicles, query) => {
        return vehicles.filter(vehicle => {
            const name = vehicle.name ? vehicle.name.toLowerCase() : ""; // Convert name to lowercase for case-insensitive search.
            const model = vehicle.model ? vehicle.model.toLowerCase() : ""; // Convert model to lowercase.
            return name.includes(query.toLowerCase()) || model.includes(query.toLowerCase()); // Match name or model.
        });
    };

    // Handles sorting option change.
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    // Handles search input change.
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Clears error messages.
    const clearError = () => {
        setError(null);
    };

    return (
        <>
            {error && <ErrorNotification message={error} clearError={clearError} />} 

            <section className="top-vehicles">
                <h2>All Our Vehicles:</h2>

                <form action="search-results.html" method="GET" className="search-form">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search for Cars..."
                        required
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
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
}
