import { useEffect, useState } from "react";
import { useGetAllVehicles } from "../../hooks/useService.js";
import LatestVehicle from "./latestVehicle/LatestVehicle.jsx";
import TopVehicle from "./topVehicle/TopVehicle.jsx";
import ErrorNotification from "../errorNotification/ErrorNotification.jsx";

export default function Home() {
    // Fetch all vehicles and handle errors:
    const [vehicles, error] = useGetAllVehicles();
    const [errorMessage, setErrorMessage] = useState(""); // State to manage error message.

    // Update error message if error occurs:
    useEffect(() => {
        if (error) {
            setErrorMessage(error.message); // Set error message to show in notification.
        }
    }, [error]); // Effect depends on the error value.

    // Get top 3 most liked vehicles by sorting based on userList length (likes):
    const topLikedVehicles = vehicles
        .sort((a, b) => b.userList.length - a.userList.length) // Sort by number of likes (userList).
        .slice(0, 3); // Take top 3.

    // Get the latest 3 vehicles:
    const latestVehicles = vehicles.slice(-3).reverse(); // Slice the last 3 vehicles (reversed).

    return (
        <>
            {errorMessage && <ErrorNotification message={errorMessage} clearError={() => setErrorMessage("")} />}

            <section className="section main">
                <div className="inner">
                    <article className="card">
                        <img src="toyota-supra.png" alt="Toyota Supra" /> {/* Example car image */}
                    </article>
                </div>
            </section>

            <section className="top-vehicles">
                <h2>👑 Top 3 Most Liked Vehicles: </h2>
                <div className="vehicles-container">
                    {topLikedVehicles.length ? (
                        topLikedVehicles.map(vehicle => (
                            <TopVehicle key={vehicle._id} {...vehicle} />
                        ))
                    ) : (
                        <h2>No Vehicles Available yet!</h2>
                    )}
                </div>
            </section>

            <hr />

            <section className="top-vehicles">
                <h2>Latest 3 Vehicles: </h2>
                <div className="vehicles-container">
                    {latestVehicles.length ? (
                        latestVehicles.map(vehicle => (
                            <LatestVehicle key={vehicle._id} {...vehicle} />
                        ))
                    ) : (
                        <h2>No Vehicles Available yet!</h2>
                    )}
                </div>
            </section>
        </>
    );
}
