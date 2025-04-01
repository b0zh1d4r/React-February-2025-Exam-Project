import { useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm";
import { useCreateVehicle } from "../../hooks/useService";
import { useState } from "react";
import ErrorNotification from "../errorNotification/ErrorNotification.jsx";

// Initial values for the form:
const initialValues = {
    name: "",
    price: "",
    year: "",
    imageUrl: "",
    engine: "",
    condition: "",
    transmission: "",
    description: "",
};

export default function Create() {
    const [error, setError] = useState(""); // State for errors.
    const navigate = useNavigate(); // Hook for navigation.
    const createVehicle = useCreateVehicle(); // Function to create a vehicle.

    // Function to handle form submission when creating a new vehicle:
    const createHandler = async (values) => {
        try {
            setError(""); // Clear any existing error before making the request.
            await createVehicle(values); // Send the request to create a new vehicle.
            navigate("/vehicles");
        } catch (err) {
            setError(err?.error || "Create failed"); // Store the error message if any.
        }
    };

    // Using the useForm hook to manage form values:
    const { values, changeHandler, onSubmit } = useForm(initialValues, createHandler);

    return (
        <>
            {error && <ErrorNotification message={error} clearError={() => setError("")} />}
            
            <div className="create-container">
                <div className="create-box">
                    <h2>Create a New Vehicle Listing</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-grid">
                            {[ 
                                { label: "Vehicle Name", name: "name", type: "text", placeholder: "Enter Vehicle's Name" },
                                { label: "Price in USD", name: "price", type: "number", placeholder: "Enter Vehicle's Price" },
                                { label: "Year", name: "year", type: "number", placeholder: "Enter Year of Manufacture" },
                                { label: "Vehicle Image", name: "imageUrl", type: "text", placeholder: "Enter Image URL" },
                                { label: "Engine", name: "engine", type: "text", placeholder: "Enter Vehicle's Engine" },
                                { label: "Condition", name: "condition", type: "text", placeholder: "Enter Vehicle's Condition" },
                                { label: "Transmission", name: "transmission", type: "text", placeholder: "Enter Vehicle's Transmission" },
                            ].map(({ label, name, type, placeholder }) => (
                                <div className="input-group" key={name}>
                                    <label htmlFor={name}>{label}:</label>
                                    <input
                                        type={type}
                                        id={name}
                                        name={name}
                                        placeholder={placeholder}
                                        value={values[name] || ""}
                                        onChange={changeHandler}
                                        required
                                    />
                                </div>
                            ))}
                            
                            <div className="input-group full-width">
                                <label htmlFor="description">Vehicle Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe the Vehicle"
                                    value={values.description || ""}
                                    onChange={changeHandler}
                                    required
                                />
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
}
