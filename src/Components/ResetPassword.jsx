import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams(); // Get the token from URL params
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://passwordresetflow-be.onrender.com/api/reset-password/${token}`, {
                method: 'PUT', // Ensure method matches backend expectations
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/'); // Redirect to login page after success
            }, 2000); // Delay to allow user to see success message
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {error && <div>Error: {error}</div>}
            {success && <div>Password reset successful! Redirecting to login...</div>}
        </div>
    );
};

export default ResetPassword;
