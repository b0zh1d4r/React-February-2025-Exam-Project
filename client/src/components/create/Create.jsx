import { useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm";
import { useCreateVehicle } from "../../hooks/useService";
import { useState } from "react";
import ErrorNotification from "../errorNotification/ErrorNotification.jsx";

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

export default function Create() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const createVehicle = useCreateVehicle();

    const createHandler = async (values) => {
        try {
            setError("");

            await createVehicle(values);
            navigate(`/vehicles`);
        } catch (err) {
            setError(err.error || 'Create failed');
        }
    };

    const { values, changeHandler, onSubmit } = useForm(initialValues, createHandler);

    return (
        <>
            {error && <ErrorNotification message={error} clearError={() => setError('')} />}
            <div className="create-container">
                <div className="create-box">
                    <h2>Create a New Vehicle Listing</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-grid">
                            <div className="input-group">
                                <label htmlFor="name">Vehicle Name:</label>
                                <input type="text" id="name" name="name" placeholder="Enter Vehicle Name"
                                    value={values.name || ''} onChange={changeHandler} required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="price">Price in USD:</label>
                                <input type="number" id="price" name="price" placeholder="Enter Vehicle Price"
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
                                <label htmlFor="engine">Engine:</label>
                                <input type="text" id="engine" name="engine" placeholder="Enter Engine" required value={values.engine} onChange={changeHandler} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="condition">Condition:</label>
                                <input type="text" id="condition" name="condition"  placeholder="Enter Condition" required value={values.condition} onChange={changeHandler} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="transmission">Transmission:</label>
                                <input type="text" id="transmission" name="transmission" placeholder="Enter Transmission" required value={values.transmission} onChange={changeHandler} />
                            </div>
                            <div className="input-group full-width">
                                <label htmlFor="description">Vehicle Description:</label>
                                <textarea id="description" name="description" placeholder="Describe the Vehicle"
                                    value={values.description || ''} onChange={changeHandler} required></textarea>
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
