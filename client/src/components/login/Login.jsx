import { useActionState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const loginHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);

        const authData = await login(values.email, values.password);

        userLoginHandler(authData);

        navigate('/');
    };

    const [_, loginAction, isPending] = useActionState(loginHandler, { email: '', password: '' });

    return (
        <>
            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    <form action={loginAction}>
                        <div className="textbox">
                            <input type="email" placeholder="Email" name="email" required />
                            <i className="icon fa-solid fa-envelope"></i>
                        </div>
                        <div className="textbox">
                            <input type="password" placeholder="Password" name="password" required />
                            <i className="icon fa-solid fa-key"></i>
                        </div>
                        <div className="login-btn">
                            <button type="submit" disabled={isPending}>Login</button>
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