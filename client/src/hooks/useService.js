import { useEffect, useState } from "react";
import { create, getAll, getOne } from "../api/vehicleApi";
import { useNavigate } from "react-router";

// Custom hook to get all vehicles:
export function useGetAllVehicles() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getAll();
            setVehicles(result);
        }
        fetchData();
    }, []);

    return [vehicles, setVehicles];
}

// Custom hook to get a single vehicle by its ID:
export function useGetOneVehicle(vehicleId) {
    const [vehicle, setVehicle] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getOne(vehicleId);
                setVehicle(result);
                setError(null);
            } catch (err) {
                setError("Vehicle not found or invalid route.");
                setVehicle(null);
                navigate("*");
            }
        }
        fetchData();
    }, [vehicleId]);

    return [vehicle, setVehicle, error];
}

// Custom hook to create a new vehicle:
export function useCreateVehicle() {
    const vehicleGetHandler = async (data) => {
        return await create(data);
    };

    return vehicleGetHandler;
}
