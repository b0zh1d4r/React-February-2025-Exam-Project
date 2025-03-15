export default function Profile() {
    return (
        <>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-image">
                        <img src="../../../public/profile.png" alt="Profile Image" />
                    </div>
                    <div className="profile-info">
                        <h1>John Doe</h1>
                        <p>Vehicles Dealer @GaragiX</p>
                    </div>
                </div>
                <div className="profile-details">
                    <h2>Contact Information:</h2>
                    <ul>
                        <li><strong>ID:</strong> 0123456789</li>
                        <li><strong>Email:</strong> john.doe@example.com</li>
                        <li><strong>Phone Number:</strong> +1 (555) 123-4567</li>
                        <li><strong>Location:</strong> New York, NY</li>
                    </ul>
                </div>
                <div className="profile-vehicles">
                    {/* <h2>No Vehicles Available yet!</h2> */}
                    <h2>All Available Vehicles:</h2>
                    <div className="vehicle-item">
                        <img src="../../../public/bmw-m5-e60.jpg" alt="Vehicle Model 1" />
                        <p><strong>BMW M5 E60</strong> - $30,000</p>
                        <a href="#" className="read-more-btn">Read More</a>
                    </div>
                    <div className="vehicle-item">
                        <img src="../../../public/mercedes-cls-63-amg.jpg" alt="Vehicle Model 2" />
                        <p><strong>Mercedes CLS 63 AMG</strong> - $70,000</p>
                        <a href="#" className="read-more-btn">Read More</a>
                    </div>
                </div>
            </div>
        </>
    )
}