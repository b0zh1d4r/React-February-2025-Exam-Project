import { useNavigate, useParams } from "react-router";
import { useGetOneVehicle } from "../../hooks/useService";
import { useForm } from "../../hooks/useForm";
import { update } from "../../api/vehicleApi";
import { useEffect, useState } from "react";
import ErrorNotification from "../errorNotification/ErrorNotification";

// Initial values for the form fields:
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

export default function Edit() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { vehicleId } = useParams();
    const [vehicle] = useGetOneVehicle(vehicleId);

    const validate = (values) => {
        if (!values.name.trim()) return "Name is required.";
        if (values.name.trim().length < 2) return "Name must be at least 2 characters!";
        if (!values.price || values.price <= 0) return "Price must be a positive number!";
        const currentYear = new Date().getFullYear();
        if (!values.year || values.year < 1886 || values.year > currentYear) {
            return `Year must be between 1886 and ${currentYear}.`;
        }
        if (!values.imageUrl.trim() || !/^https?:\/\/.+/.test(values.imageUrl)) {
            return "Enter a valid Image URL (starting with http/https).";
        }
        if (!values.engine.trim()) return "Engine is required.";
        if (values.engine.trim().length < 2) return "Engine must be at least 2 characters!";
        if (!values.condition.trim()) return "Condition is required.";
        if (values.condition.trim().length < 2) return "Condition must be at least 2 characters!";
        if (!values.transmission.trim()) return "Transmission is required.";
        if (values.transmission.trim().length < 2) return "Transmission must be at least 2 characters!";
        if (!values.description.trim() || values.description.trim().length < 10) {
            return "Description must be at least 10 characters long.";
        }
        return null;
    };

    const { changeHandler, onSubmit, values, changeValues } = useForm(
        Object.assign(initialValues, vehicle.item),
        async (values) => {
            const validationError = validate(values);
            if (validationError) return setError(validationError);

            try {
                await update(vehicleId, values);
                navigate(`/vehicles/${vehicleId}`);
            } catch (err) {
                setError(err.error || "Update failed");
                changeValues(values);
            }
        }
    );

    useEffect(() => {
        if (vehicle?.vehicle) {
            changeValues({ ...vehicle.item });
        }
    }, [vehicle]);

    return (
        <>
            {error && <ErrorNotification message={error} clearError={() => setError('')} />}

            <div className="edit-container">
                <div className="edit-box">
                    <h2>Edit Vehicle Listing</h2>
                    <form onSubmit={onSubmit}>
                        <div className="input-group">
                            <label htmlFor="name">Car Name:</label>
                            <input type="text" id="name" name="name" required value={values.name} onChange={changeHandler} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="description">Car Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                value={values.description}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="price">Price in USD:</label>
                            <input type="number" id="price" name="price" required value={values.price} onChange={changeHandler} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="year">Year:</label>
                            <input type="number" id="year" name="year" required value={values.year} onChange={changeHandler} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="imageUrl">Car Image:</label>
                            <input type="text" id="imageUrl" name="imageUrl" required value={values.imageUrl} onChange={changeHandler} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="engine">Engine:</label>
                            <input type="text" id="engine" name="engine" required value={values.engine} onChange={changeHandler} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="condition">Condition:</label>
                            <input type="text" id="condition" name="condition" required value={values.condition} onChange={changeHandler} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="transmission">Transmission:</label>
                            <input type="text" id="transmission" name="transmission" required value={values.transmission} onChange={changeHandler} />
                        </div>

                        <div className="submit-btn">
                            <button type="submit">Edit Listing</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}