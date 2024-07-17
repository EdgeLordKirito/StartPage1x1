const apiKey = '32906faedfc90416c85f8e3265b60214'; // Replace with your API key
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const fallbackCoordinates = {
    latitude: '48.2083',
    longitude: '16.3557'
};


// Function to fetch user's location from ipapi.co
    function getLocation() {
        return fetch('https://ipapi.co/json/')
            .then(response => {
                if (!response.ok) {
                    return fallbackCoordinates;
                }
                return response.json();
            })
            .then(locationData => {
                return {
                    latitude: locationData.latitude,
                    longitude: locationData.longitude
                };
            });
    }

// Function to fetch weather data and save it to localStorage
	function fetchAndSaveWeather(latitude, longitude) {
		const apiUrl = `${apiBaseUrl}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&units=metric`;

		console.log(`Fetching data for: (${latitude}, ${longitude})`);
		fetch(apiUrl)
			.then(response => {
				if (!response.ok) {
					const unknownWeather = {
						error: 'Weather data could not be fetched.'
					};
					localStorage.setItem('weatherInfo', JSON.stringify(unknownWeather));
					// Optionally return here or handle the response as needed
					return;
				}
				return response.json();
			})
			.then(weatherData => {
				if (weatherData) {
					// Store weather data in localStorage
					localStorage.setItem('weatherInfo', JSON.stringify(weatherData));
				} else {
					const unknownWeather = {
						error: 'Weather data could not be fetched.'
					};
					localStorage.setItem('weatherInfo', JSON.stringify(unknownWeather));
				}
			});
	}


    // Function to fetch location and weather on page load
    function fetchWeather() {
        getLocation()
            .then(({ latitude, longitude }) => {
                fetchAndSaveWeather(latitude, longitude);
            })
            .catch(() => {
                // Use fallback coordinates if location cannot be determined
                fetchAndSaveWeather(fallbackCoordinates.latitude, fallbackCoordinates.longitude);
            });
    }

document.addEventListener("DOMContentLoaded", function() {
    // Run fetchWeather function on page load
    fetchWeather();
});
