import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import eventImage from "../assets/event-hero.jpg"; // Make sure to add an image

const Home = () => {
    return (
        <section className="home-container">
            {/* Hero Section */}
            <div className="hero">
                <div className="hero-text">
                    <h1>Plan, Manage, and Elevate Your Events</h1>
                    <p>Streamline your event planning process with our powerful event management platform.</p>
                    <Link to="/register" className="cta-button">Get Started</Link>
                </div>
                <div className="hero-image">
                    <img src={eventImage} alt="Event Management" />
                </div>
            </div>

            {/* Features Section */}
            <div className="features">
                <h2>Why Choose Us?</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        <h3>Seamless Event Planning</h3>
                        <p>Organize events efficiently with our intuitive dashboard.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Real-Time Updates</h3>
                        <p>Keep attendees informed with instant notifications.</p>
                    </div>
                    <div className="feature-item">
                        <h3>User Authentication</h3>
                        <p>Secure login and guest access for smooth event participation.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
