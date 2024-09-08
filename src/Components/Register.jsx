import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!username || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('https://url-backend-mod0.onrender.com/api/user/register', {
                username,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) { // Status code for successful registration
                alert('Registration successful');

                // Clear form fields
                setUsername('');
                setEmail('');
                setPassword('');

                // Redirect to login page
                navigate('/');
            } else {
                alert(response.data.message || 'Registration failed');
            }
        } catch (error) {
            // Detailed error handling
            if (error.response && error.response.data) {
                alert(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p><a href="/">Login</a></p>
        </div>
    );
};

export default Register;
