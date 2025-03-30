import { Routes, Route } from 'react-router'

import { AuthContextProvider } from './contexts/AuthContext'

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
import Logout from './components/logout/Logout'
import ErrorPage from './components/errorPage/ErrorPage'
import ErrorNotification from './components/errorNotification/ErrorNotification'
import Footer from './components/footer/Footer'

import RouteGuard from './components/common/RouteGuard'
import GuestGuard from "./components/common/GuestGuard"

import './styles/_styles.css'
import './App.css'

function App() {

    return (
        <AuthContextProvider>
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/vehicles" element={<Vehicles />}></Route>
                    <Route path="/vehicles/:vehicleId" element={<Details />}></Route>
                    <Route path="/vehicles/:vehicleId/edit" element={<RouteGuard> <Edit /> </RouteGuard>}></Route>
                    <Route path="/vehicles/contact-dealer/:dealerId" element={<ContactDealer />}></Route>
                    <Route path="/create" element={<RouteGuard> <Create /> </RouteGuard>}></Route>
                    <Route path="/profile" element={<RouteGuard> <Profile /> </RouteGuard>}></Route>
                    <Route path="/login" element={<GuestGuard> <Login /> </GuestGuard>}></Route>
                    <Route path="/register" element={<GuestGuard> <Register /> </GuestGuard>}></Route>
                    <Route path="/logout" element={<RouteGuard> <Logout /> </RouteGuard>}></Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Routes>
                <Footer />
            </>
        </AuthContextProvider>
    )
}

export default App
