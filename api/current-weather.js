const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const API_KEY = process.env.OPENWEATHER_API_KEY; 
    const { city } = req.query; 

    if (!city) {
        return res.status(400).json({ cod: 400, message: "City parameter is required." });
    }

    const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(currentURL);
        const data = await response.json();

        res.status(response.status).json(data);
    } catch (error) {
        console.error("Current weather fetch error:", error);
        res.status(500).json({ cod: 500, message: "Internal Server Error during fetch." });
    }
};