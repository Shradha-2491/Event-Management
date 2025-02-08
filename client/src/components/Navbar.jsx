import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";
import CreateEventModal from "./CreateEventModal";
import "../styles/Navbar.css";
import { createEvent } from "../api/events";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setIsAuthenticated(true);
            navigate('/dashboard');
        }
    }, [localStorage.getItem("user")]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        navigate('/');
    };

    const handleCreateEvent = async (eventData) => {
        console.log("Event Created:", eventData);
        const response = await createEvent(eventData, user?.token);
    };

    return (
        <>
            <nav className="navbar">
                <Link>
                    <img src={logo} alt="Event Management Logo" className="navbar-logo" />
                </Link>
                <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </div>


                <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                    {isAuthenticated && user?.user?.type !== 'Guest' ? (
                        <>
                            <span className="user-name">{user?.user?.name}</span>
                            <button className="create-button" onClick={() => setIsModalOpen(true)}>Create Event</button>
                            <button className="navbar-button" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login">
                            <button className="navbar-button">Login</button>
                        </Link>
                    )}
                </div>
            </nav>

            <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateEvent} />
        </>
    );
};

export default Navbar;
