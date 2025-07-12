const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/proxy/*', async (req, res) => {
    try {
        const encodedUrl = req.params[0];
        console.log("Encoded URL received:", encodedUrl);

        let url;
        try {
            url = `https://${decodeURIComponent(encodedUrl)}`;
            console.log("Proxying to final URL:", url);
        } catch (e) {
            console.error("URL decoding error:", e);
            return res.status(400).json({ error: "Invalid URL encoding", details: e.message });
        }

        const tokenUrl = 'https://sookatoken.vercel.app/api/zig/token';
        const tokenResponse = await axios.get(tokenUrl);
        const tokenData = tokenResponse.data;

        if (!tokenData || !tokenData.token) {
            console.error("Failed to get a valid token from the API.");
            return res.status(500).json({ error: "Invalid or missing token in API response" });
        }

        const authorizationHeaderValue = tokenData.token;

        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
            'Authorization': authorizationHeaderValue
        };

        const response = await axios.get(url, {
            headers: headers,
            responseType: 'stream'
        });

        res.setHeader('Content-Type', response.headers['content-type']);
        response.data.pipe(res);

    } catch (error) {
        console.error("Proxy error:", error.message);
        if (error.response) {
            res.status(error.response.status).send(error.response.statusText);
        } else {
            res.status(500).json({ error: 'Proxy Error', details: error.message });
        }
    }
});

module.exports = app;
