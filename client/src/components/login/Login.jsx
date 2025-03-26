import { Link, useNavigate } from "react-router";
import { useLogin } from "../../hooks/useAuth.js";
import { useForm } from "../../hooks/useForm.js";
import { useState } from "react";

const initialValues = { email: '', password: '' }

export default function Login() {
    const [_, setError] = useState('')
    const login = useLogin()
    const navigate = useNavigate()

    const loginHandler = async ({ email, password }) => {
        console.log('Form values:', { email, password });  // Debug log
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.error || 'Login failed');
        }
    };

    const { values, changeHandler, onSubmit } = useForm(initialValues, loginHandler);

    return (
        <>
            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={onSubmit}>
                        <div className="textbox">
                            <input type="email" placeholder="Email" name="email" required value={values.email} onChange={changeHandler} />
                            <i className="icon fa-solid fa-envelope"></i>
                        </div>
                        <div className="textbox">
                            <input type="password" placeholder="Password" name="password" required value={values.password} onChange={changeHandler} />
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
};