import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

const Home = () => {
    return (
        <div>
            <header className="header">
                <nav className="navbar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        
                    </ul>
                </nav>
            </header>
            <div className="home-container">
                <div className="home-message">
                    <h1>Welcome to Our Application</h1>
                    <p>Experience a seamless and secure login and registration process.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
