import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

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
            <a
                href="#"
                className={`nav-hamburger ${menuOpen ? "active" : ""}`}
                onClick={toggleMenu}
            >
                <span className="nav-hamburger-line"></span>
                <span className="nav-hamburger-line"></span>
                <span className="nav-hamburger-line"></span>
            </a>
            <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
                <ul>
                    <li className="nav-menu-link">
                        <Link to="/" onClick={closeMenu}>Home</Link>
                    </li>
                    <li className="nav-menu-link">
                        <Link to="/about" onClick={closeMenu}>About</Link>
                    </li>
                    <li className="nav-menu-link">
                        <Link to="/vehicles" onClick={closeMenu}>Vehicles</Link>
                    </li>
                    <li className="nav-menu-link">
                        <Link to="/create" className="create" onClick={closeMenu}>Create</Link>
                    </li>
                    <li className="nav-menu-link">
                        <Link to="/profile" onClick={closeMenu}>Profile</Link>
                    </li>
                    <li className="nav-menu-link">
                        <Link to="/logout" onClick={closeMenu}>Logout</Link>
                    </li>
                    <li className="nav-menu-link">
                        <Link to="/login#" onClick={closeMenu}>Login</Link>
                    </li>
                    <li className="nav-menu-link">
                        <Link to="/register" onClick={closeMenu}>Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};