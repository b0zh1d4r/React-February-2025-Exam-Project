import { useState } from 'react'
import { Routes, Route } from 'react-router'

import { UserContext } from './contexts/UserContext'

import Header from './components/header/Header'
import Home from './components/home/Home'
import About from './components/about/About'
import Vehicles from './components/vehicles/Vehicles'
import Details from './components/details/Details'
import Edit from './components/edit/Edit'
import ContactDealer from './components/contactDealer/ContactDealer'
import Create from './components/create/Create'
import Profile from './components/profile/Profile'
import Login from './components/login/Login'
import Register from './components/register/Register'
import ErrorPage from './components/errorPage/ErrorPage'
import ErrorNotification from './components/errorNotification/ErrorNotification'
import Footer from './components/footer/Footer'


import './styles/_styles.css'
import './App.css'

function App() {
    const [authData, setAuthData] = useState({});

    const userLoginHandler = (resultData) => {
        setAuthData(resultData);
    };

    return (
        <UserContext.Provider value={{ ...authData, userLoginHandler }}>
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/vehicles" element={<Vehicles />}></Route>
                    <Route path="/vehicles/:vehicleId/details" element={<Details />}></Route>
                    <Route path="/vehicles/:vehicleId/edit" element={<Edit />}></Route>
                    <Route path="/contact-dealer" element={<ContactDealer />}></Route>
                    <Route path="/create" element={<Create />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/login" element={<Login onLogin={userLoginHandler} />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/logout" element={<Logout />}></Route>
                    <Route path="*" element={<ErrorNotification />}></Route>
                </Routes>
                <Footer />
            </>
        </UserContext.Provider>
    )
}

export default App
