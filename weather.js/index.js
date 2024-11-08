const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "8644dd7276d2486632e0366c53274c17";

weatherForm.addEventListener("submit",async evnet =>{
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherdata = await getweatherData(city);
            displayWeatherInfo(weatherdata);
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }
    }
    else{
        displayerror("enter a city");
    }
});

async function getweatherData (city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiurl);
    console.log(response);

    if(!response.ok){
        throw new Error("could not fetch a weather data");
    }
    return await response.json();

}

function displayWeatherInfo(data){
    const {name:city,
            main: {temp, humidity}, weather: [{description, id}] } = data;

            card.textContent = ""
            card.style.display = "flex";

            const cityDisplay = document.createElement("h1");
            const tempDisplay = document.createElement("p");
            const humidityDisplay = document.createElement("p");
            const descDisplay = document.createElement("p");
            const weatherEmoji = document.createElement("p");

            cityDisplay.textContent = city;
            tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
            humidityDisplay.textContent = `Humidity: ${humidity}%`;
            descDisplay.textContent = description;
            weatherEmoji.textContent = getWeatherEmoji(id);

            cityDisplay.classList.add("cityDisplay");
            tempDisplay.classList.add("tempDisplay");
            humidityDisplay.classList.add("humidityDisplay");
            descDisplay.classList.add("descDisplay");
            weatherEmoji.classList.add("weatherEmoji");


            card.appendChild(cityDisplay);
            card.appendChild(tempDisplay);
            card.appendChild(humidityDisplay);
            card.appendChild(descDisplay);
            card.appendChild(weatherEmoji);


            

            
    }

function getWeatherEmoji(weatherid){
    switch(true){
        case (weatherid >= 200 && weatherid < 300):
            return "⛈️";

            case (weatherid >= 300 && weatherid < 400):
            return "🌧️";

            case (weatherid >= 500 && weatherid < 600):
            return "🌦️";

            case (weatherid >= 700 && weatherid < 800):
            return "🌨️";

            case (weatherid >= 200 && weatherid < 300):
            return "🌫️";
            
            case (weatherid === 800):
                return "☀️";
            
            case (weatherid >= 801 && weatherid < 810):
                return "☁️";
            default:
                return "❓";
    }

}

function displayerror(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    
    card.textContent ="";
    card.style.display = "flex";
    card.appendChild(errorDisplay); 

}