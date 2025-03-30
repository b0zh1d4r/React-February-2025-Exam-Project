import { useNavigate, useParams } from "react-router"
import { useGetOneVehicle } from "../../hooks/useService"
import { useForm } from "../../hooks/useForm"
import { update } from "../../api/vehicleApi"
import { useEffect, useState } from "react"

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
    const [_, setError] = useState('')
    const navigate = useNavigate()
    const { vehicleId } = useParams()
    const [vehicle] = useGetOneVehicle(vehicleId)

    const { changeHandler, onSubmit, values, changeValues } = useForm(Object.assign(initialValues, vehicle.item), async (values) => {
        try {
            await update(vehicleId, values)
            navigate(`/vehicles/${vehicleId}`);
        } catch (err) {
            setError(err.error || 'Update failed');
            changeValues(values); 
        }
    })

    useEffect(() => {
        if (vehicle?.vehicle) {
            changeValues({ ...vehicle.item });
        }
    }, [vehicle]);
    
    
    return (
        <>
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
};
