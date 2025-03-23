import { useEffect, useState } from "react";
import { create, getAll, getOne } from "../api/vehicleApi.js";
import { useNavigate } from "react-router";

export function useGetAllItems() {

    const [items, setItems] = useState([])

    useEffect(() => {
        async function fetchData() {
            const result = await getAll();
            setItems(result);
        }
        fetchData();
    }, []);

    return [items, setItems]
}

export function useGetOneItem(itemId) {
    const [item, setItem] = useState({})
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getOne(itemId);
                setItem(result);
                setError(null);
            } catch (err) {
                setError("Item not found or invalid route.");
                setItem(null);
                navigate("*")
            }
        }
        fetchData();
    }, [itemId]);

    return [item, setItem, error]
}

export function useCreateItem() {

    const itemGetHandler = async (data) => {
        return await create(data);
    };

    return itemGetHandler;
}