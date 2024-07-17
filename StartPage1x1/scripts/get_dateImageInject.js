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
	const iconPath = "static/images/rain.svg";
	let weather = `Weather`;
	document.getElementById(
		"date"
	).innerHTML = `${today} | ${hour}:${minute}:${second} |<img src="${iconPath}" alt="Weather Icon" class="weather-icon">${weather}`;
	setTimeout(showTime, 0);
}

function addZero(i) {
	if (i.length < 2) i = "0" + i;
	return i;
}

showTimeAndWeather();
