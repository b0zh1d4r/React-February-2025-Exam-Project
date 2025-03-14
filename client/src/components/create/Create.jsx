export default function Create() {
    return (
        <>
            <div className="create-container">
                <div className="create-box">
                    <h2>Create a New Vehicle Listing</h2>
                    <form>
                        <div className="form-grid">
                            <div className="input-group">
                                <label htmlFor="vehicle-name">Vehicle Name:</label>
                                <input type="text" id="vehicle-name" name="vehicle-name" placeholder="Enter Car Name" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="vehicle-price">Price in USD:</label>
                                <input type="number" id="vehicle-price" name="vehicle-price" placeholder="Enter Car Price" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="vehicle-year">Year:</label>
                                <input type="number" id="vehicle-year" name="vehicle-year" placeholder="Enter Year of Manufacture" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="vehicle-image">Vehicle Image:</label>
                                <input type="text" id="vehicle-image" name="vehicle-image" placeholder="Enter Image URL" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="vehicle-engine">Engine Type:</label>
                                <select id="vehicle-engine" name="vehicle-engine" required>
                                    <option defaultValue="" disabled selected>Select Engine Type</option>
                                    <option defaultValue="petrol">Petrol Engine</option>
                                    <option defaultValue="diesel">Diesel Engine</option>
                                    <option defaultValue="hybrid">Hybrid Engine</option>
                                    <option defaultValue="electric">Electric Engine</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="vehicle-condition">Condition:</label>
                                <select id="vehicle-condition" name="vehicle-condition" required>
                                    <option defaultValue="" disabled selected>Select Condition</option>
                                    <option defaultValue="new">New</option>
                                    <option defaultValue="used">Used</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="vehicle-transmission">Transmission:</label>
                                <select id="vehicle-transmission" name="vehicle-transmission" required>
                                    <option defaultValue="" disabled selected>Select Transmission</option>
                                    <option defaultValue="manual">Manual</option>
                                    <option defaultValue="automatic">Automatic</option>
                                    <option defaultValue="semi-automatic">Semi-Automatic</option>
                                </select>
                            </div>
                            <div className="input-group full-width">
                                <label htmlFor="vehicle-description">Vehicle Description:</label>
                                <textarea id="vehicle-description" name="vehicle-description" placeholder="Describe the Car" required></textarea>
                            </div>
                        </div>
                        <div className="submit-btn full-width">
                            <button type="submit">Create Listing</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};