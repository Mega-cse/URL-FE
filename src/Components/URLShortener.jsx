import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URLShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [description, setDescription] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortUrl('');
        setLoading(true);

        try {
            // Send POST request to shorten URL
            const response = await axios.post('https://url-backend-mod0.onrender.com/api/shorten', { longUrl });
            const newShortUrl = response.data.shortUrl;
            setShortUrl(newShortUrl);

            // Retrieve existing URLs from local storage
            const urlData = JSON.parse(localStorage.getItem('urls')) || [];

            // Add new URL data
            urlData.push({ longUrl, shortUrl: newShortUrl, description });

            // Store updated URL data in local storage
            localStorage.setItem('urls', JSON.stringify(urlData));
        } catch (error) {
            setError('Error shortening URL. Please try again.');
            console.error('Error shortening URL:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Enter long URL"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Shortening...' : 'Shorten'}
                </button>
            </form>
            {error && <div className="error">{error}</div>}
            {shortUrl && (
                <div className="card">
                    <h2>Shortened URL:</h2>
                    <p><strong>Original URL:</strong> {longUrl}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Shortened URL:</strong> <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                </div>
            )}
        </div>
    );
};

export default URLShortener;
