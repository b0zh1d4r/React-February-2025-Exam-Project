import { Link } from "react-router";

export default function Home() {
    return (
        <>

            <section className="section main">
                <div className="inner">
                    <article className="card">
                        <img src="../../../public/toyota-supra.png" alt="Toyota Supra" />
                    </article>
                </div>
            </section>

            <section className="top-vehicles">
                {/* <!-- <h2>No Vehicles Available yet!</h2> --> */}
                <h2>👑 Top 3 Rated Vehicles This Week: </h2>
                <div className="vehicles-container">
                    <div className="vehicle-card">
                        <img src="../../../public/bmw-m3-e46-gtr.jpg" alt="Car 1" />
                        <h3>#1: BMW M3 GTR</h3>
                        <p className="price">$45,000</p>
                        {/* <!-- <p className="rating">⭐ 9.9/10</p> --> */}
                        <Link to="#" className="read-more-btn">Read More</Link>
                    </div>
                    <div className="vehicle-card">
                        <img src="../../../public/ford-mustang-gt.jpg" alt="Car 2" />
                        <h3>#2: Ford Mustang GT</h3>
                        <p className="price">$55,000</p>
                        {/* <!-- <p className="rating">⭐ 9.8/10</p> --> */}
                        <Link to="#" className="read-more-btn">Read More</Link>
                    </div>
                    <div className="vehicle-card">
                        <img src="../../../public/audi-rs6.avif" alt="Car 3" />
                        <h3>#3: Audi RS6</h3>
                        <p className="price">$60,000</p>
                        {/* <!-- <p className="rating">⭐ 9.7/10</p> --> */}
                        <Link to="#" className="read-more-btn">Read More</Link>
                    </div>
                </div>
            </section>

            <hr />

            <section className="top-vehicles">
                {/* <!-- <h2>No vehicles available yet!</h2> --> */}
                <h2>Latest Vehicles: </h2>
                <div className="vehicles-container">
                    <div className="vehicle-card">
                        <img src="../../../public/bmw-m3-e46-gtr.jpg" alt="Car 1" />
                        <h3>BMW M3 GTR</h3>
                        <p className="price">$45,000</p>
                        {/* <!-- <p className="rating">⭐ 9.9/10</p> --> */}
                        <a href="#" className="read-more-btn">Read More</a>
                    </div>
                    <div className="vehicle-card">
                        <img src="../../../public/ford-mustang-gt.jpg" alt="Car 2" />
                        <h3>Ford Mustang GT</h3>
                        <p className="price">$55,000</p>
                        {/* <!-- <p className="rating">⭐ 9.8/10</p> --> */}
                        <a href="#" className="read-more-btn">Read More</a>
                    </div>
                    <div className="vehicle-card">
                        <img src="../../../public/audi-rs6.avif" alt="Car 3" />
                        <h3>Audi RS6</h3>
                        <p className="price">$60,000</p>
                        {/* <!-- <p className="rating">⭐ 9.7/10</p> --> */}
                        <a href="#" className="read-more-btn">Read More</a>
                    </div>
                </div>
            </section>
        </>
    );
};