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
                            <textarea id="vehicle-description" name="vehicle-description" required>
                                The BMW M3 GTR is a high-performance sports car with incredible handling and a
                                distinctive racing heritage. Powered by a 493 hp engine, it's a thrilling driving experience.
                            </textarea>
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
                            <input type="text" id="vehicle-image" name="vehicle-image" defaultValue="/bmw-m3-e46-gtr.jpg" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="vehicle-engine">Engine Type:</label>
                            <select id="vehicle-engine" name="vehicle-engine" required defaultValue="petrol">
                                <option value="" disabled>Select Engine Type</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="electric">Electric</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="vehicle-condition">Condition:</label>
                            <select id="vehicle-condition" name="vehicle-condition" required defaultValue="used">
                                <option value="" disabled>Select Condition</option>
                                <option value="new">New</option>
                                <option value="used">Used</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="vehicle-transmission">Transmission:</label>
                            <select id="vehicle-transmission" name="vehicle-transmission" required defaultValue="manual">
                                <option value="" disabled>Select Transmission</option>
                                <option value="manual">Manual</option>
                                <option value="automatic">Automatic</option>
                                <option value="semi-automatic">Semi-Automatic</option>
                            </select>
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