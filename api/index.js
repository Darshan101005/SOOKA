const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { URL } = require('url');

const app = express();

app.use(cors());

app.get('/api/proxy/*', async (req, res) => {
    try {
        const encodedUrl = req.url.substring('/api/proxy/'.length);

        let url;
        try {
            url = decodeURIComponent(encodedUrl);
        } catch (e) {
            return res.status(400).json({ error: "Invalid URL encoding" });
        }

        if (!url.startsWith('https://')) {
            return res.status(400).json({ error: "Only full URLs starting with 'https://' are supported." });
        }

        const tokenUrl = 'https://darshan.freewebhostmost.com/SOOKA/output.json';
        const tokenResponse = await axios.get(tokenUrl);
        const tokenData = tokenResponse.data;

        if (!tokenData || !tokenData.token) {
            return res.status(500).json({ error: "Invalid token data" });
        }

        const jwtToken = tokenData.token;

        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
            'Authorization': `Bearer ${jwtToken}`
        };

        const response = await axios.get(url, {
            headers: headers,
            responseType: 'stream'
        });

        res.setHeader('Content-Type', response.headers['content-type']);

        response.data.pipe(res);

    } catch (error) {
        console.error(error);
        if (error.response) {
            res.status(error.response.status).send(error.response.statusText);
        } else {
            res.status(500).json({ error: 'Proxy Error', details: error.message });
        }
    }
});

module.exports = app;
