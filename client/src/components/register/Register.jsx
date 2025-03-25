import { Link, useNavigate } from "react-router";
import { useRegister } from "../../hooks/useAuth.js";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

const initialValues = { 
    username: '', 
    email: '', 
    phoneNumber: '', 
    location: '', 
    password: '', 
    repeatPassword: ''
};

export default function Register() {
    const [_, setError] = useState('');
    const register = useRegister();
    const navigate = useNavigate();

    const registerHandler = async (values) => {
        if (values.password !== values.repeatPassword) {
            return setError('Password mismatch!');
        }

        try {
            await register(values.username, values.email, values.phoneNumber, values.location, values.password, values.repeatPassword);
            navigate('/');
        } catch (err) {
            setError(err.error || 'Registration failed');
        }
    };

    const { values, changeHandler, onSubmit } = useForm(initialValues, registerHandler);

    return (
        <>
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
