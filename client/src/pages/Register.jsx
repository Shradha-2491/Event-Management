import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { register } from "../api/auth";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(formData);
            localStorage.setItem("user", JSON.stringify(response));
            console.log("Register Successful:", response);
            navigate('/dashboard')
        } catch (error) {
            console.error("Login Error:", error.message);
            alert(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="login-button">Register</button>
                </form>
                <div className="login-links">
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Register;
