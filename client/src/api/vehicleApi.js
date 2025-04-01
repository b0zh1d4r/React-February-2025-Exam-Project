import requester from "./requester";

const BASE_URL = "http://localhost:8888/vehicles"

export const getAll = async () => {
    const result = await requester.get(`${BASE_URL}`);
    return result;
};

export const getOne = async (vehicleId) => {
    const result = await requester.get(`${BASE_URL}/${vehicleId}`);
    return result;
};

export const create = async (vehicleData) => {
    const result = await requester.post(`${BASE_URL}/create`, vehicleData);
    return result;
};

export const remove = async (vehicleId) => {
    return await requester.delete(`${BASE_URL}/${vehicleId}`);
}

export const update = async (vehicleId, vehicleData) => {
    return await requester.put(`${BASE_URL}/${vehicleId}/edit`, vehicleData);
}

export const like = async (vehicleId) => {
    return await requester.get(`${BASE_URL}/${vehicleId}/like`);
};

export const undoLike = async (vehicleId) => {
    return await requester.get(`${BASE_URL}/${vehicleId}/undoLike`);
};