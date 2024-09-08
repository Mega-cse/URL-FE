import React, { useState } from 'react';
import axios from 'axios';

const URLShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortUrl('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/api/shorten', { longUrl });
            setShortUrl(response.data.shortUrl);
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Shortening...' : 'Shorten'}
                </button>
            </form>
            {error && <div className="error">{error}</div>}
            {shortUrl && (
                <div className="card">
                    <h2>Shortened URL:</h2>
                    <p><strong>Original URL:</strong> {longUrl}</p>
                    <p><strong>Shortened URL:</strong> <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                </div>
            )}
        </div>
    );
};

export default URLShortener;
