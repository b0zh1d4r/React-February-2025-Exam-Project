import { Link } from "react-router";

export default function ErrorPage() {
    return (
        <section className="error-container">
            <h2>❌ Error 404: Page Not Found!</h2>
            <p className="error-message">
                The page you're looking for might have been removed, had its name changed,
                or is temporarily unavailable.
            </p>
            <p className="error-help">
                Please <span className="highlight">check the URL</span> or go back to the
                <Link to="/"> home page</Link>.
            </p>
            <Link to="/" className="back-home-btn">🏠 Return to Home</Link>
        </section>
    );
};