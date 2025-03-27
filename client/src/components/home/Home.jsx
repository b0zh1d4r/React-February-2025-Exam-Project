import { useGetAllVehicles } from "../../hooks/useService.js";
import LatestVehicle from "./latestVehicle/latestVehicle.jsx";
import TopVehicle from "./topVehicle/TopVehicle.jsx";

export default function Home() {
    const [vehicles] = useGetAllVehicles();

    const topLikedVehicles = vehicles
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3);

    const latestVehicles = vehicles.slice(-3);

    return (
        <>
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
                <h2>Latest Vehicles: </h2>
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
