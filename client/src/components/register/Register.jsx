import { Link } from "react-router";

export default function Register() {
    return (
        <>
            <div className="register-container">
                <div className="register-box">
                    <h2>Register</h2>
                    <form>
                        <div className="textbox">
                            <input type="text" placeholder="Username" name="username" required />
                            <i className="icon fa-solid fa-user"></i>
                        </div>
                        <div className="textbox">
                            <input type="email" placeholder="Email" name="email" required />
                            <i className="icon fa-solid fa-envelope"></i>
                        </div>
                        <div className="textbox">
                            <input type="tel" placeholder="Phone Number" name="phoneNumber" required />
                            <i className="icon fa-solid fa-phone"></i>
                        </div>
                        <div className="textbox">
                            <input type="text" placeholder="Location" name="location" required />
                            <i className="icon fa-solid fa-location-dot"></i>
                        </div>
                        <div className="textbox">
                            <input type="password" placeholder="Password" name="password" required />
                            <i className="icon fa-solid fa-key"></i>
                        </div>
                        <div className="textbox">
                            <input type="password" placeholder="Repeat Password" name="repeat-password" required />
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
};