import { Link, useNavigate } from "react-router";
import { useLogin } from "../../hooks/useAuth.js";
import { useForm } from "../../hooks/useForm.js";
import { useState } from "react";
import ErrorNotification from "../errorNotification/ErrorNotification.jsx";

// Initial form values for email and password:
const initialValues = { email: "", password: "" };

export default function Login() {
    const [error, setError] = useState(""); // State to manage error messages.
    const login = useLogin(); // Custom hook for handling login.
    const navigate = useNavigate(); // Hook for navigation after successful login.

    // Handler function for login, takes email and password:
    const loginHandler = async ({ email, password }) => {
        try {
            setError(""); // Reset error message before trying to log in.

            await login(email, password);

            navigate("/"); 
        } catch (err) {
            setError(err.message || "Login failed. Please try again."); // Display error if login fails.
        }
    };

    // useForm hook for managing form values and handling submit:
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
