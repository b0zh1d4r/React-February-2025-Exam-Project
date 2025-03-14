import { Link } from "react-router";

export default function Footer() {
    return (
        <>
            <section className="footer">
                <div className="social">
                    <a href="https://linktr.ee/b0zh1d4r" target="_blank"><i className="fa-solid fa-tree"></i></a>
                    <a href="https://x.com/b0zh1d4r" target="_blank"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="https://www.linkedin.com/in/bozhidar-ivanov-875769316/" target="_blank"><i
                        className="fa-brands fa-linkedin-in"></i></a>
                    <a href="https://github.com/b0zh1d4r" target="_blank"><i className="fa-brands fa-github"></i></a>
                </div>

                <ul className="list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/vehicles">Vehicles</Link></li>
                    <li><Link to="/create" className="create">Create</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
                <p className="copyright">Copyright &copy;2025; Designed by <span className="designer">Bozhidar</span></p>
            </section >
        </>
    );
};