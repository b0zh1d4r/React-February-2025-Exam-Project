import requester from "./requester.js"

const BASE_URL = "http://localhost:8888/auth"

export const login = (email, password) => {

    const authData = requester.post(`${BASE_URL}/login`, { email, password })
    
    return authData
}

export const register = (email, password, rePass) => {
    const authData = requester.post(`${BASE_URL}/register`, { email, password, rePass })

    return authData

}

export const logout = () => {

    return requester.get(`${BASE_URL}/logout`);

}