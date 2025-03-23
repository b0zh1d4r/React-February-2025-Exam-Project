import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { userId: _id } = useContext(AuthContext); // Check if user is logged in

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 700) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="nav">
            <div className="nav-logo">
                <Link to="/">
                    <img src="../../../public/garagix-logo.png" alt="GaragiX Logo" />
                </Link>
            </div>
            <a href="#" className={`nav-hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
                <span className="nav-hamburger-line"></span>
                <span className="nav-hamburger-line"></span>
                <span className="nav-hamburger-line"></span>
            </a>
            <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
                <ul>
                    <li className="nav-menu-link">
                        <Link to="/" onClick={closeMenu} className={location.pathname === "/" ? "active" : ""}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-menu-link">
                        <Link to="/about" onClick={closeMenu} className={location.pathname === "/about" ? "active" : ""}>
                            About
                        </Link>
                    </li>
                    <li className="nav-menu-link">
                        <Link to="/vehicles" onClick={closeMenu} className={location.pathname === "/vehicles" ? "active" : ""}>
                            Vehicles
                        </Link>
                    </li>

                    {/* Logged-in Users */}
                    {_id ? (
                        <div className="nav-authenticated">
                            <li className="nav-menu-link">
                                <Link to="/create" onClick={closeMenu} className={location.pathname === "/create" ? "active" : ""}>
                                    Create
                                </Link>
                            </li>
                            <li className="nav-menu-link">
                                <Link to="/profile" onClick={closeMenu} className={location.pathname === "/profile" ? "active" : ""}>
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-menu-link">
                                <Link to="/logout" onClick={closeMenu}>
                                    Logout
                                </Link>
                            </li>
                        </div>
                    ) : (
                        // Not Logged-in Users
                        <div className="nav-guest">
                            <li className="nav-menu-link">
                                <Link to="/login" onClick={closeMenu} className={location.pathname === "/login" ? "active" : ""}>
                                    Login
                                </Link>
                            </li>
                            <li className="nav-menu-link">
                                <Link to="/register" onClick={closeMenu} className={location.pathname === "/register" ? "active" : ""}>
                                    Register
                                </Link>
                            </li>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    );
}

