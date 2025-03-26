import { useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm";
import { useCreateVehicle } from "../../hooks/useService";
import { useState } from "react";

const initialValues = {
    name: '',
    price: '',
    year: '',
    imageUrl: '',
    engine: '',
    condition: '',
    transmission: '',
    description: '',
};

export default function Sell() {
    const [_, setError] = useState('');
    const navigate = useNavigate();
    const createVehicle = useCreateVehicle();

    const createHandler = async (values) => {
        try {
            await createVehicle(values);
            navigate(`/vehicles`);
        } catch (err) {
            setError(err.error || 'Create failed');
        }
    };

    const { values, changeHandler, onSubmit } = useForm(initialValues, createHandler);

    return (
        <div className="create-container">
            <div className="create-box">
                <h2>Create a New Vehicle Listing</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-grid">
                        <div className="input-group">
                            <label htmlFor="name">Vehicle Name:</label>
                            <input type="text" id="name" name="name" placeholder="Enter Car Name"
                                value={values.name || ''} onChange={changeHandler} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="price">Price in USD:</label>
                            <input type="number" id="price" name="price" placeholder="Enter Car Price"
                                value={values.price || ''} onChange={changeHandler} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="year">Year:</label>
                            <input type="number" id="year" name="year" placeholder="Enter Year of Manufacture"
                                value={values.year || ''} onChange={changeHandler} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="imageUrl">Vehicle Image:</label>
                            <input type="text" id="imageUrl" name="imageUrl" placeholder="Enter Image URL"
                                value={values.imageUrl || ''} onChange={changeHandler} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="engine">Engine Type:</label>
                            <select id="engine" name="engine" value={values.engine || ''} onChange={changeHandler} required>
                                <option value="" disabled>Select Engine Type</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="condition">Condition:</label>
                            <select id="condition" name="condition" value={values.condition || ''} onChange={changeHandler} required>
                                <option value="" disabled>Select Condition</option>
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="transmission">Transmission:</label>
                            <select id="transmission" name="transmission" value={values.transmission || ''} onChange={changeHandler} required>
                                <option value="" disabled>Select Transmission</option>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Semi-Automatic">Semi-Automatic</option>
                            </select>
                        </div>
                        <div className="input-group full-width">
                            <label htmlFor="description">Vehicle Description:</label>
                            <textarea id="description" name="description" placeholder="Describe the Car"
                                value={values.description || ''} onChange={changeHandler} required></textarea>
                        </div>
                    </div>
                    <div className="submit-btn full-width">
                        <button type="submit">Create Listing</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
