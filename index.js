const axios = require('axios');

const headers = {
    'sec-ch-ua-platform': '"Windows"',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzkyNjU2NjYsImlzcyI6IlZSIiwiZXhwIjoxNzM5MzEzMDAwLCJ3bXZlciI6Mywid21pZGZtdCI6ImFzY2lpIiwid21pZHR5cCI6MSwid21rZXl2ZXIiOjMsIndtdG1pZHZlciI6NCwid21pZGxlbiI6NTEyLCJ3bW9waWQiOjMyLCJ3bWlkIjoiZjJiMDU4OGItY2VhZi00YjA2LWJkYmUtOTJhNTM2ZTNiY2M1IiwiZmlsdGVyIjoiKHR5cGU9PVwidmlkZW9cIiYmRGlzcGxheUhlaWdodDw9MjE2MCl8fCh0eXBlPT1cImF1ZGlvXCImJmZvdXJDQyE9XCJhYy0zXCIpfHwodHlwZSE9XCJ2aWRlb1wiJiZ0eXBlIT1cImF1ZGlvXCIpIn0.OUEc3eN_e5ZCBw3Wxdh9HErFH5yRoudZGN5VjIgrjII',
    'Referer': 'https://sooka.my/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
    'sec-ch-ua-mobile': '?0',
};

async function fetchData(req, res) {
    try {
        const url = 'https://l19.dp.sooka.my/2105/linear/index.mpd';
        const response = await axios.get(url, { headers });
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch data", details: error.message });
    }
}

module.exports = fetchData;
