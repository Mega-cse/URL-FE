import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        // Retrieve user data from local storage
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setUser(storedUser);
        } catch (e) {
            console.error('Failed to parse user data from localStorage:', e);
            setUser({});
        }
    }, [navigate]);

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">
                Welcome, {user?.username || 'User'}
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
