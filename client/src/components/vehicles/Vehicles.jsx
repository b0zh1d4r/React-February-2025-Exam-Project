export default function Vehicles() {
    return (
        <>
            <section className="top-vehicles">
                {/* <h2>No Vehicles Available yet!</h2> */}
                <h2>Find a Vehicle:</h2>
                <form action="search-results.html" method="GET" className="search-form">
                    <input type="text" name="query" placeholder="Search for Cars..." required />
                    <button type="submit">Search</button>
                </form>
                <br />
                <h2>All Our Vehicles: </h2>
                <div className="sort-by-container">
                    <label htmlFor="sort-by">Sort By: </label>
                    <select id="sort-by" name="sort-by">
                        <option value="most-popular">Most Popular</option>
                        <option value="best-rating">Best Rating</option>
                        <option value="newest">Newest</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                    </select>
                </div>
                <div className="vehicles-container">
                    <div className="vehicles-container">
                        <div className="vehicle-card">
                            <img src="public/bmw-m3-e46-gtr.jpg" alt="Car 1" />
                            <h3>BMW M3 GTR</h3>
                            <p className="price">$45,000</p>
                            {/* <!-- <p className="rating">⭐ 9.9/10</p> --> */}
                            <a href="./details.html" className="read-more-btn">Read More</a>
                        </div>
                        <div className="vehicle-card">
                            <img src="public/ford-mustang-gt.jpg" alt="Car 2" />
                            <h3>Ford Mustang GT</h3>
                            <p className="price">$55,000</p>
                            {/* <!-- <p className="rating">⭐ 9.8/10</p> --> */}
                            <a href="#" className="read-more-btn">Read More</a>
                        </div>
                        <div className="vehicle-card">
                            <img src="public/audi-rs6.avif" alt="Car 3" />
                            <h3>Audi RS6</h3>
                            <p className="price">$60,000</p>
                            {/* <!-- <p className="rating">⭐ 9.7/10</p> --> */}
                            <a href="#" className="read-more-btn">Read More</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};