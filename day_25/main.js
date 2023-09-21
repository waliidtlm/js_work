const http = require('http');
const fs = require('fs');
// const fetch = require('node-fetch');

const hostname = '127.0.0.1';
const port = 3000;

const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
    { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
    { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Rabat', lat: 34.0209, lng: -6.8416 },
];

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/weather') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        try {
            const cityName = await readCityNameFromFile();
            const city = selectCity(cityName);
            const temperature = await fetchTemperature(city);
            await writeTemperatureToFile(cityName, temperature);
            console.log(`Temperature for ${cityName} written to file.`);

            res.end(`Temperature for ${cityName}: ${temperature}`);
        } catch (error) {
            console.error(error);
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

function readCityNameFromFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('input.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const lines = data.split('\n');
                const cityName = lines[0].trim();
                resolve(cityName);
            }
        });
    });
}

function selectCity(cityName) {
    const foundCity = cities.find(city => city.name === cityName);
    return foundCity;
}

async function fetchTemperature(city) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`City: ${city.name}`);
        console.log(`Temperature: ${data.current_weather.temperature}°C`);
        return `${data.current_weather.temperature}°C`;
    } catch (error) {
        console.error('Error fetching temperature:', error);
        throw error;
    }
}

function writeTemperatureToFile(cityName, temperature) {
    return new Promise((resolve, reject) => {
        const fileName = `${cityName}.txt`;

        fs.writeFile(fileName, temperature, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                reject(err);
            } else {
                console.log(`Temperature written to ${fileName}`);
                resolve();
            }
        });
    });
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/weather`);
});