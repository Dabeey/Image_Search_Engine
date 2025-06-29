const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/search', async (req, res) => {
    const { query, page } = req.query;
    const accesskey = process.env.UNSPLASH_ACCESS_KEY;
    if (!query) return res.status(400).json({ error: 'Missing query' });

    const url = `https://api.unsplash.com/search/photos?page=${page || 1}&query=${encodeURIComponent(query)}&client_id=${accesskey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch images' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});