import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

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
                    {[
                        { path: "/", label: "Home" },
                        { path: "/about", label: "About" },
                        { path: "/vehicles", label: "Vehicles" },
                        { path: "/create", label: "Create" },
                        { path: "/profile", label: "Profile" },
                        { path: "/logout", label: "Logout" },
                        { path: "/login", label: "Login" },
                        { path: "/register", label: "Register" },
                    ].map(({ path, label }) => (
                        <li key={path} className="nav-menu-link">
                            <Link
                                to={path}
                                onClick={closeMenu}
                                className={location.pathname === path ? "active" : ""}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
