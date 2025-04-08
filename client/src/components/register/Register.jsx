import { Link, useNavigate } from "react-router";
import { useRegister } from "../../hooks/useAuth.js";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import ErrorNotification from "../errorNotification/ErrorNotification.jsx";

// Initial form values:
const initialValues = {
    username: '',
    email: '',
    phoneNumber: '',
    location: '',
    password: '',
    repeatPassword: ''
};

export default function Register() {
    const [error, setError] = useState('');
    const register = useRegister();
    const navigate = useNavigate();

    const validate = ({ username, email, phoneNumber, location, password, repeatPassword }) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;
        const phoneRegex = /^\+?\d{7,15}$/;

        if (!username.trim()) return "Username is required.";
        if (username.length < 2) return "Username must be at least 2 characters long!";
        if (!email.trim()) return "Email is required.";
        if (!emailRegex.test(email)) return "Invalid email format.";
        if (!phoneNumber.trim()) return "Phone number is required.";
        if (!phoneRegex.test(phoneNumber)) return "Invalid phone number format.";
        if (!location.trim()) return "Location is required.";
        if (location.length < 1) return "Location must be at least 1 character long!";
        if (!password.trim()) return "Password is required.";
        if (!passwordRegex.test(password)) return "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number!";
        if (password !== repeatPassword) return "Passwords do not match.";

        return null;
    };

    const registerHandler = async (values) => {
        const validationError = validate(values);

        if (validationError) {
            setError(validationError);

            // Clear password fields on validation error
            if (
                validationError.includes("Password") ||
                validationError.includes("Passwords do not match")
            ) {
                changeValues(prev => ({
                    ...prev,
                    password: '',
                    repeatPassword: ''
                }));
            }

            return;
        }

        try {
            setError("");
            await register(
                values.username,
                values.email,
                values.phoneNumber,
                values.location,
                values.password,
                values.repeatPassword
            );
            navigate('/');
        } catch (err) {
            setError(err.error || 'Registration failed');

            // Clear password fields on server error
            changeValues(prev => ({
                ...prev,
                password: '',
                repeatPassword: ''
            }));
        }
    };

    const { values, changeHandler, onSubmit, changeValues } = useForm(initialValues, registerHandler);

    return (
        <>
            {error && <ErrorNotification message={error} clearError={() => setError('')} />}

            <div className="register-container">
                <div className="register-box">
                    <h2>Register</h2>
                    <form onSubmit={onSubmit}>
                        <div className="textbox">
                            <input type="text" placeholder="Username" name="username" required value={values.username} onChange={changeHandler} />
                            <i className="icon fa-solid fa-user"></i>
                        </div>

                        <div className="textbox">
                            <input type="email" placeholder="Email" name="email" required value={values.email} onChange={changeHandler} />
                            <i className="icon fa-solid fa-envelope"></i>
                        </div>

                        <div className="textbox">
                            <input type="tel" placeholder="Phone Number" name="phoneNumber" required value={values.phoneNumber} onChange={changeHandler} />
                            <i className="icon fa-solid fa-phone"></i>
                        </div>

                        <div className="textbox">
                            <input type="text" placeholder="Location" name="location" required value={values.location} onChange={changeHandler} />
                            <i className="icon fa-solid fa-location-dot"></i>
                        </div>

                        <div className="textbox">
                            <input type="password" placeholder="Password" name="password" required value={values.password} onChange={changeHandler} />
                            <i className="icon fa-solid fa-key"></i>
                        </div>

                        <div className="textbox">
                            <input type="password" placeholder="Repeat Password" name="repeatPassword" required value={values.repeatPassword} onChange={changeHandler} />
                            <i className="icon fa-solid fa-key"></i>
                        </div>

                        <div className="register-btn">
                            <button type="submit">Register</button>
                        </div>

                        <div className="alreadyHaveAnAccount">
                            <Link to="/login">Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
