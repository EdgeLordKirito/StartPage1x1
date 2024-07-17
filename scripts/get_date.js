function showTimeAndWeather() {
	const date = new Date();

	let today = date.toLocaleString("en", { weekday: "long" });
	let hour = date.toLocaleString("pl", { hour: "2-digit" }); // use 24h time format
	let minute = date.toLocaleString("en", { minute: "2-digit" });
	let second = date.toLocaleString("en", { second: "2-digit" });
	let day = date.toLocaleString("en", { day: "2-digit" });
	let month = date.toLocaleString("en", { month: "2-digit" });
	let year = date.toLocaleString("en", { year: "numeric" });

	minute = addZero(minute);
	second = addZero(second);
	//Procure weather data from localstorage save it in the weather string
	let weatherdata = parseWeatherData(getWeatherInfoFromLocalStorage());
	let temperature = weatherdata.temperature;
	let icon = getCharCodeFromMap(weatherdata.icon, weatherdata.description);
	let weather = `Weather`;
	document.getElementById(
		"date"
	).innerHTML = `${today} | ${hour}:${minute}:${second} | ${icon} ${temperature}°C`;
	setTimeout(showTimeAndWeather, 0);
}

function addZero(i) {
	if (i.length < 2) i = "0" + i;
	return i;
}

function getWeatherInfoFromLocalStorage() {
    // Define the default object for unknown weather
    const unknownWeather = {
        error: 'Weather data could not be fetched.'
    };

    try {
        // Attempt to retrieve the weatherInfo from localStorage
        const weatherInfo = localStorage.getItem('weatherInfo');

        // Check if weatherInfo is null or undefined
        if (weatherInfo === null || weatherInfo === undefined) {
            return unknownWeather; // Return the default object
        }

        // Return the parsed weatherInfo
        return JSON.parse(weatherInfo); // Assuming weatherInfo is stored as JSON
    } catch (error) {
        console.error('Error retrieving weather information:', error.message);
        return unknownWeather; // Return the default object if there's an error
    }
}

function parseWeatherData(weatherData) {
    if (weatherData.error === 'Weather data could not be fetched.') {
        return {
            icon: '?',
			description: '?',
            temperature: '?'  
        };
    }

    const icon = weatherData.weather[0].icon;
	const description = weatherData.weather[0].description;
    const temperature = weatherData.main.temp;
    

    return {
        icon: icon || '?',
		description: description || '?',
        temperature: temperature || '?'
    };
}


function createWeatherMap() {
    const charCodeMap = new Map([
        ['11d', '⛈'], // thunderstorm with light rain
        ['09d', '🌧'], // shower rain
        ['10d', '🌦'], // thunderstorm with rain
        ['13d', '🌨'], // snow
        ['01d', '☀'], // clear sky
        ['01n', '🌜'], // clear sky
        ['02d', '⛅'], // a few clouds
        ['02n', '⛅'], // a few clouds
        ['03d', '🌥'], // scattered clouds
        ['03n', '🌥'], // scattered clouds
        ['04d', '☁'], // cloudy
        ['04n', '☁'], // cloudy
        // Add more mappings as needed
    ]);

    // Set default mapping for unrecognized codes
    charCodeMap.default = '?';

    return charCodeMap;
}

function createSpecialWeatherMap() {
    const specialWeatherMap = new Map([
        ['mist', '🌫'],
        ['smoke', '🌫'],
        ['haze', '🌫'],
        ['sand/dust whirls', '🌫'],
        ['fog', '🌫'],
        ['sand', '🌫'],
        ['dust', '🌫'],
        ['volcanic ash', '🌫'],
        ['squalls', '🌫'],
        ['tornado', '🌫'],
    ]);
    
    // Set default mapping for unrecognized descriptions
    specialWeatherMap.default = '?';
    
    return specialWeatherMap;
}

function getCharCodeFromMap(code, description) {
    const weatherMap = createWeatherMap();
    
    if (code === '50d' && description) {
        const specialWeatherMap = createSpecialWeatherMap();
        return specialWeatherMap.get(description) || specialWeatherMap.default;
    }
    
    return weatherMap.get(code) || weatherMap.default;
}









showTimeAndWeather();
