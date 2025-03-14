export default function Edit() {
    return (
        <>
            <div className="create-container">
                <div className="create-box">
                    <h2>Edit Vehicle Listing</h2>
                    <form>
                        <div className="input-group">
                            <label htmlFor="vehicle-name">Car Name:</label>
                            <input type="text" id="vehicle-name" name="vehicle-name" defaultValue="BMW M3 GTR" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="vehicle-description">Car Description:</label>
                            <textarea id="vehicle-description" name="vehicle-description" required>The BMW M3 GTR is a high-performance sports car with incredible handling and a
                                distinctive racing heritage. Powered by a 493 hp engine, it's a thrilling driving experience.</textarea>
                        </div>
                        <div className="input-group">
                            <label htmlFor="vehicle-price">Price in USD:</label>
                            <input type="number" id="vehicle-price" name="vehicle-price" defaultValue="45000" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="vehicle-year">Year:</label>
                            <input type="number" id="vehicle-year" name="vehicle-year" defaultValue="2005" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="vehicle-image">Car Image:</label>
                            <input type="text" id="vehicle-image" name="vehicle-image" defaultValue="../../../public/bmw-m3-e46-gtr.jpg" required />
                        </div>
                        <div className="submit-btn">
                            <button type="submit">Edit Listing</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};