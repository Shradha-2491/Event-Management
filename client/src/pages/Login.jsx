import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { guestLogin, login } from "../api/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
        try {
            const response = await login(email, password);
            localStorage.setItem("user", JSON.stringify(response));
            console.log("Login Successful:", response);
            navigate('/dashboard')
        } catch (error) {
            console.error("Login Error:", error.message);
            alert(error.message);
        }
    };

    const handleGuestLogin = async () => {
        console.log("Guest login");
        localStorage.setItem("user", JSON.stringify({
            "user": {
                "id": null,
                "name": "Guest",
                "type": "Guest",
                "created_at": new Date()
            },
            "token": ""
        }));
        console.log("Guest Login Successful");
        navigate('/dashboard')
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <button className="guest-button" onClick={handleGuestLogin}>
                    Continue as a Guest
                </button>
                <div className="login-links">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                    <p><Link to="/forgot-password">Forgot Password?</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
