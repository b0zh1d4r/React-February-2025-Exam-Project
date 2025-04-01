import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false); // State to control if the mobile menu is open
    const location = useLocation(); // Hook to get the current URL
    const { userId: _id } = useContext(AuthContext); // Get logged-in user ID from AuthContext

    useEffect(() => {
        // Handle window resizing to close the mobile menu on narrow screens
        const handleResize = () => {
            if (window.innerWidth <= 700) {
                setMenuOpen(false); // Close menu if screen width is less than or equal to 700px
            }
        };

        window.addEventListener("resize", handleResize); // Add resize event listener
        return () => window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle mobile menu visibility
    const closeMenu = () => setMenuOpen(false); // Close the mobile menu

    return (
        <nav className="nav">
            <div className="nav-logo">
                <Link to="/">
                    <img src="../../../public/garagix-logo.png" alt="GaragiX Logo" />
                </Link>
            </div>
            {/* Hamburger icon for mobile navigation */}
            <a href="#" className={`nav-hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
                <span className="nav-hamburger-line"></span>
                <span className="nav-hamburger-line"></span>
                <span className="nav-hamburger-line"></span>
            </a>
            {/* Navigation menu, shown when menuOpen is true */}
            <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
                <ul>
                    {/* Menu item links */}
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

                    {/* Conditional rendering for logged-in users */}
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
                        // Menu items for guests (not logged-in users)
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
