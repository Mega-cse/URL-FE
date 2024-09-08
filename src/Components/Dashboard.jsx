import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const isAuthenticated = !!localStorage.getItem('token');
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [navigate]);

    // Retrieve user data from local storage
    let user;
    try {
        user = JSON.parse(localStorage.getItem('user')) || {};
    } catch (e) {
        console.error('Failed to parse user data from localStorage:', e);
        user = {};
    }

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">
                Welcome, {user?.username ? user.username : 'User'}
            </h1>
            <p className="dashboard-welcome">Experience your personalized dashboard</p>
            <div className="navigation-container">
                <button className="dashboard-button" onClick={() => navigate('/url-shortener')}>
                    Go to URL Shortener
                </button>
            </div>
            <div className="logout-container">
                <button className="dashboard-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
