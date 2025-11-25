const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const { lat, lon } = req.query; 

    if (!lat || !lon) {
        return res.status(400).json({ cod: 400, message: "Latitude and Longitude required." });
    }

    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(forecastURL);
        const data = await response.json();

        res.status(response.status).json(data);
    } catch (error) {
        console.error("Forecast weather fetch error:", error);
        res.status(500).json({ cod: 500, message: "Internal Server Error during fetch." });
    }
};