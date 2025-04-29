import { useContext } from "react";
import { LoginContext } from "../../Context/Login/Login";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";
import logo from "./logo.jpg";

function NavBar() {
    const { isAuthenticated, setIsAuthenticated } = useContext(LoginContext);
    const navigate = useNavigate();

    async function logOut() {
        try {
            const response = await axios.post("http://localhost:3000/user/logout", {}, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });

            if (response.status === 200) {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("refreshToken");
                sessionStorage.removeItem("companyName");
                setIsAuthenticated(false);
                window.location.replace("/login");
            } else {
                console.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    function navigateToLogin() {
        navigate("/login");
    }

    return (
        <nav className="nav-bar">
            {/* Left: Company Logo */}
            <div className="nav-left">
                <Link to="/" className="logo-link">
                <img src={logo} alt="EcoNerve Logo" className="logo-image" />

                </Link>
            </div>

            {/* Center: Links */}
            <div className={`nav-center ${isAuthenticated ? 'authenticated' : ''}`}>
                {isAuthenticated && (
                    <Link to="/dashboard" className="dashboard-link">
                        Dashboard
                    </Link>
                )}
                <Link to="/testmodel" className="dashboard-link">
                    Image Classifier
                </Link>
            </div>

            {/* Right: Buttons */}
            <div className="nav-right">
                {isAuthenticated ? (
                    <button className="logout-btn" onClick={logOut}>
                        LogOut: {sessionStorage.getItem("companyName")}
                    </button>
                ) : (
                    <button className="auth-btn" onClick={navigateToLogin}>
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}

export { NavBar };
