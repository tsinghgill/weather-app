const express = require('express');
const requestIp = require('request-ip');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

let sessions = {};

app.use(cookieParser());

app.get('/hello', async (req, res) => {
    try {
        const clientIp = requestIp.getClientIp(req);
        const geoUrl = `http://api.ipapi.com/${clientIp}?access_key=${process.env.IPAPI_KEY}`;
        const geoResponse = await axios.get(geoUrl);
        const city = geoResponse.data.city;
        console.log("geoResponse", geoResponse.data)

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_KEY}&units=imperial`;
        const weatherResponse = await axios.get(weatherUrl);
        const weatherData = weatherResponse.data;
        console.log("weatherData", weatherData)

        let sessionId;
        if (req.cookies.sessionId && sessions[req.cookies.sessionId]) {
            sessionId = req.cookies.sessionId;
        } else {
            sessionId = uuidv4();
            sessions[sessionId] = { startTime: new Date() };
            res.cookie('sessionId', sessionId, { httpOnly: true }); // Set cookie
        }

        res.json({ message: "Weather data", sessionId: sessionId });
    } catch (error) {
        console.error("Error in /hello:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/goodbye', (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (sessionId && sessions[sessionId]) {
        const goodbyeTime = new Date();
        const timeDiff = goodbyeTime - sessions[sessionId].startTime;
        delete sessions[sessionId];

        res.json({ timeDifference: timeDiff });
    } else {
        res.status(400).json({ error: "Invalid or expired session" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});