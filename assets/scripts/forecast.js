// Get the weather forecast
async function getForcastData() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dd51b13c60mshcfa44cb1124b33fp109983jsnb399edffa700',
            'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
        }
    };
    
    return fetch('https://aerisweather1.p.rapidapi.com/forecasts/corcoran,mn', options)
        .then(response => response.json())
        .catch(err => console.error(err));
}

// On page load
async function init() {
    renderWeatherData(await getWeatherData());
    renderDadJoke(await getDadJoke());
    renderAllForecastData(await getForcastData());
}

init();