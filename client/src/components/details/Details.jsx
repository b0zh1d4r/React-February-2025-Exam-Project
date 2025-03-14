import { Link } from "react-router";

export default function Details() {
    return (
        <>
            <section className="vehicle-details">
                <h2>Vehicle Details:</h2>
                <div className="vehicle-container">
                    <div className="vehicle-card">
                        <img src="../../../public/bmw-m3-e46-gtr.jpg" alt="BMW M3 GTR" />
                        <h3>BMW M3 GTR</h3>
                        <p className="price">$45,000</p>
                        {/* <!-- <p className="rating">⭐ 9.9/10</p> --> */}
                        <p className="description">The BMW M3 GTR is a high-performance sports car with incredible handling and a
                            distinctive racing heritage. Powered by a 493 hp engine, it's a thrilling driving experience.</p>
                        <p className="description">Year: 2005</p>
                        <p className="description">Engine Type: Petrol</p>
                        <p className="description">Condition: Used</p>
                        <p className="description">Tranmission: Manual</p>
                        <Link href="/contact-dealer" className="contact-btn">Contact Dealer</Link>
                        <Link href="./edit.html" className="edit-btn">Edit</Link>
                        <Link href="#" className="delete-btn">Delete</Link>
                        {/* <!-- <a href="#" className="like-btn">Like</a> --> */}
                        {/* <!-- <a href="#" className="like-btn">You have already liked this vehicle!</a> --> */}
                    </div>
                </div>
            </section>
        </>
    );
};