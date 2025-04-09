import { Link, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Footer() {
    const location = useLocation();
    const { userId: _id } = useContext(AuthContext);

    const authLinks = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/vehicles", label: "Vehicles" },
        { path: "/create", label: "Create" },
        { path: "/profile", label: "Profile" },
        { path: "/logout", label: "Logout" },
    ];

    const guestLinks = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/vehicles", label: "Vehicles" },
        { path: "/login", label: "Login" },
        { path: "/register", label: "Register" },
    ];

    const linksToRender = _id ? authLinks : guestLinks;

    return (
        <section className="footer">
            <div className="social">
                <a href="https://linktr.ee/b0zh1d4r" target="_blank"><i className="fa-solid fa-tree"></i></a>
                <a href="https://x.com/b0zh1d4r" target="_blank"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="https://www.linkedin.com/in/bozhidar-ivanov-875769316/" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="https://github.com/b0zh1d4r" target="_blank"><i className="fa-brands fa-github"></i></a>
            </div>

            <ul className="list">
                {linksToRender.map(({ path, label }) => (
                    <li key={path}>
                        <Link
                            to={path}
                            className={location.pathname === path ? "active" : ""}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>

            <p className="copyright">
                Copyright &copy;2025; Designed by <span className="designer">Bozhidar</span>
            </p>
        </section>
    );
}
