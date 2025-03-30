import { useEffect, useState } from "react";
import { create, getAll, getOne } from "../api/vehicleApi";
import { useNavigate } from "react-router";

export function useGetAllVehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getAll();
                setVehicles(result);
                setError(null);
            } catch (err) {
                setError("Failed to load vehicles. Please try again.");
                setVehicles([]);
            }
        }
        fetchData();
    }, []);

    return [vehicles, error, setVehicles];
}

export function useGetOneVehicle(vehicleId) {
    const [vehicle, setVehicle] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getOne(vehicleId);
                if (!result) {
                    throw new Error("Vehicle not found.");
                }
                setVehicle(result);
                setError(null);
            } catch (err) {
                setError("Vehicle not found or invalid route.");
                setVehicle(null);
                navigate("*");
            }
        }
        fetchData();
    }, [vehicleId, navigate]);

    return [vehicle, error, setVehicle];
}

export function useCreateVehicle() {
    const vehicleCreateHandler = async (data) => {
        try {
            return await create(data);
        } catch (err) {
            throw new Error("Failed to create vehicle. Please try again.");
        }
    };

    return vehicleCreateHandler;
}
