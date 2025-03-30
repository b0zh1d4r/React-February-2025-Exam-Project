import { useEffect, useState } from "react";
import { useGetAllVehicles } from "../../hooks/useService.js";
import LatestVehicle from "./latestVehicle/latestVehicle.jsx";
import TopVehicle from "./topVehicle/TopVehicle.jsx";
import ErrorNotification from "../errorNotification/ErrorNotification.jsx";

export default function Home() {
    const [vehicles, error] = useGetAllVehicles();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (error) {
            setErrorMessage(error.message);
        }
    }, [error]);

    const topLikedVehicles = vehicles
        .sort((a, b) => b.userList.length - a.userList.length)
        .slice(0, 3);

    const latestVehicles = vehicles.slice(-3);
    

    return (
        <>
            {errorMessage && <ErrorNotification message={errorMessage} clearError={() => setErrorMessage("")} />}

            <section className="section main">
                <div className="inner">
                    <article className="card">
                        <img src="toyota-supra.png" alt="Toyota Supra" />
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
