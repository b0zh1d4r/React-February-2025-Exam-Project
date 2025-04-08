import { Link, useNavigate } from "react-router";
import { useLogin } from "../../hooks/useAuth.js";
import { useForm } from "../../hooks/useForm.js";
import { useState } from "react";
import ErrorNotification from "../errorNotification/ErrorNotification.jsx";

const initialValues = { email: "", password: "" };

export default function Login() {
    const [error, setError] = useState("");
    const login = useLogin();
    const navigate = useNavigate();

    const validate = ({ email, password }) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;

        if (!email.trim()) return "Email is required.";
        if (!emailRegex.test(email)) return "Invalid email format.";

        if (!password.trim()) return "Password is required.";
        if (!passwordRegex.test(password)) {
            return "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number!";
        }

        return null;
    };

    const loginHandler = async ({ email, password }) => {
        const validationError = validate({ email, password });
        if (validationError) return setError(validationError);

        try {
            setError("");
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        }
    };

    const { values, changeHandler, onSubmit } = useForm(initialValues, loginHandler);

    return (
        <>
            {error && <ErrorNotification message={error} clearError={() => setError("")} />}

            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={onSubmit}>
                        <div className="textbox">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                required
                                value={values.email}
                                onChange={changeHandler}
                            />
                            <i className="icon fa-solid fa-envelope"></i>
                        </div>
                        <div className="textbox">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                required
                                value={values.password}
                                onChange={changeHandler}
                            />
                            <i className="icon fa-solid fa-key"></i>
                        </div>

                        <div className="login-btn">
                            <button type="submit">Login</button>
                        </div>

                        <div className="notRegisteredYet">
                            <Link to="/register">Not registered yet?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
