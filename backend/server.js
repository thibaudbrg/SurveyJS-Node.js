const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Use the promise-based methods
const path = require('path');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());

// Middleware to restrict access to local-only routes
function localAccessOnly(req, res, next) {
    const ip = req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    // Check if the IP is a local IP
    if (ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1") {
        next(); // It's a local request, proceed to the next middleware
    } else {
        res.status(403).send('Access Denied: This page is only accessible locally.');
    }
}

// Endpoint to serve survey.json
app.get('/survey-json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/survey.json'));
});

// Endpoint to serve survey_theme.json
app.get('/survey-theme', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/survey_theme.json'));
});

// Endpoint to retrieve all survey results
app.get('/get-all-survey-results', async (req, res) => {
    const dataFolderPath = path.join(__dirname, 'data/results');
    try {
        let allResults = [];
        const days = await fs.readdir(dataFolderPath);

        for (const day of days) {
            const dayFolderPath = path.join(dataFolderPath, day);
            const stats = await fs.stat(dayFolderPath);

            if (stats.isDirectory()) {
                const files = await fs.readdir(dayFolderPath);

                for (const file of files) {
                    const filePath = path.join(dayFolderPath, file);
                    const fileData = await fs.readFile(filePath, 'utf-8');
                    allResults.push(JSON.parse(fileData));
                }
            }
        }

        res.json(allResults);
    } catch (error) {
        console.error('Failed to read survey results:', error);
        res.status(500).send('Failed to retrieve survey results');
    }
});

app.post('/submit-survey', async (req, res) => {
    const data = req.body;
    const day = data.day_select.replace(/\s+/g, '_');
    const emailPrefix = data.email.split('@')[0].replace(/\./g, '_');

    const dirPath = path.join(__dirname, 'data/results', day);
    const filePath = path.join(dirPath, `${emailPrefix}.json`);

    try {
        await fs.mkdir(dirPath, { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        console.log('Survey data saved successfully');
        res.send('Survey data saved successfully');
    } catch (error) {
        console.error('Error saving survey results:', error);
        res.status(500).send('Error saving survey data');
    }
});

app.use('/get-all-survey-results', localAccessOnly);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
