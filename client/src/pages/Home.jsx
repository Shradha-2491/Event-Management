import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import eventImage from "../assets/event-hero.png";

const Home = () => {
    return (
        <section className="home-container">
            <div className="hero">
                <div className="hero-text">
                    <h1>Plan, Manage & Elevate Your Events</h1>
                    <p>Effortlessly organize and track your events with our seamless management platform.</p>
                    <Link to="/register" className="cta-button">Get Started</Link>
                </div>
                <div className="hero-image">
                    <img src={eventImage} alt="Event Management" />
                </div>
            </div>

            <div className="features">
                <h2>Why Choose Us?</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        <h3>📅 Seamless Event Planning</h3>
                        <p>Plan and manage events effortlessly with our intuitive dashboard.</p>
                    </div>
                    <div className="feature-item">
                        <h3>⚡ Real-Time Updates</h3>
                        <p>Keep your attendees engaged with instant notifications and live updates.</p>
                    </div>
                    <div className="feature-item">
                        <h3>🔒 Secure Authentication</h3>
                        <p>Safe and easy login with secure user authentication.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
