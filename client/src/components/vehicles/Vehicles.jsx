import { useGetAllVehicles } from "../../hooks/useService.js"
import Vehicle from "./vehicle/Vehicle.jsx"

export default function Catalog() {

    const [vehicles] = useGetAllVehicles()

    return (
        <>
            <section className="top-vehicles">
                {/* <h2>Find a Vehicle:</h2>
                <form action="search-results.html" method="GET" className="search-form">
                    <input type="text" name="query" placeholder="Search for Cars..." required />
                    <button type="submit">Search</button>
                </form>
                <br /> */}
                <h2>All Our Vehicles: </h2>
                {/* <div className="sort-by-container">
                    <label htmlFor="sort-by">Sort By: </label>
                    <select id="sort-by" name="sort-by">
                        <option value="most-popular">Most Popular</option>
                        <option value="best-rating">Best Rating</option>
                        <option value="newest">Newest</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                    </select>
                </div> */}
                <div className="vehicles-container">
                    <div className="vehicles-container">
                        {vehicles.length ?
                            vehicles.map(vehicle => <Vehicle key={vehicle._id} {...vehicle} />)
                            :
                            <h2>No Vehicles Available yet!</h2>
                        }
                    </div>
                </div>
            </section>
        </>
    );
};