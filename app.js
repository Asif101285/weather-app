const currentWeather = (e) => {
    e.preventDefault();
    let cityName = document.querySelector("#cityInput").value;
    let myApi = "7a08a0e9f8541685c4151b60c35c2b50";
    const weatherIcon = document.querySelector(".conditionImg");
    const audio = document.querySelector("#audio");
    // Recieving weather data through api
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myApi}&units=metric`
      )
      .then(function (response) {
        if (response.status === 404) {
          document.querySelector(".welcomeAnderror").style.display = "block";
          document.querySelector(".welcomeAnderror").innerHTML = "Invalid Input";
        } else {
          const weatherCondition = response.data.weather[0].main;
          const openWeatherIconCode = response.data.weather[0].icon;
          const openWeatherIcon = `<img src="https://openweathermap.org/img/wn/${openWeatherIconCode}@2x.png"/>`;
          const word = response.data.weather[0].description;
          // Capitilize first letter of description
          const firstLetter = word.charAt(0);
          const firstLetterCap = firstLetter.toUpperCase();
          const remainingLetters = word.slice(1);
          const capitalizedWord = firstLetterCap + remainingLetters;
          // Sending data to HTML
          document.querySelector(".description").innerHTML = `${capitalizedWord}`;
          document.querySelector("#openWeatherIcon").innerHTML = openWeatherIcon;
          document.querySelector(".feelsLike").innerHTML =
            "Feels like " + Math.round(response.data.main.feels_like) + "°";
          document.querySelector(".temperature").innerHTML =
            Math.round(response.data.main.temp) + "°C";
          document.querySelector(".cityName").innerHTML = response.data.name;
          document.querySelector("#humidityPercent").innerHTML =
            response.data.main.humidity + "%";
          document.querySelector("#windPercent").innerHTML =
            response.data.wind.speed + " km/h";
          document.querySelector("#visibilityValue").innerHTML =
            response.data.visibility / 1000 + " km/h";
          cityName = "";
          // Changing weather images dynamically
          if (weatherCondition === "Clear") {
            weatherIcon.src = "images/clear.png";
            audio.src = "clear.mp3";
            document.querySelector("body").style.background =
              "linear-gradient(to right bottom, #83a4d4, #b6fbff)";
          } else if (weatherCondition === "Clouds") {
            audio.src = "clouds.wav";
            weatherIcon.src = "images/clouds.png";
            document.querySelector("body").style.background =
              //   "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(./rain2.jpg)";
              // document.querySelector("body").style.backgroundSize = "cover";
  
              "linear-gradient(to right bottom, #667db6, #485563, #0082c8, #667db6)";
          } else if (weatherCondition === "Drizzle") {
            audio.src = "drizzle.mp3";
            weatherIcon.src = "images/drizzle.png";
            document.querySelector("body").style.background =
              "linear-gradient(to right bottom, #4B79A1, #283E51)";
          } else if (weatherCondition === "Mist" || weatherCondition === "Haze") {
            audio.src = "wind.wav";
            weatherIcon.src = "images/mist.png";
            document.querySelector("body").style.background =
              "linear-gradient(to right bottom, #525252, #3d72b4)";
          } else if (weatherCondition === "Fog") {
            audio.src = "fog.wav";
            weatherIcon.src = "images/fog.png";
            document.querySelector("body").style.background =
              "linear-gradient(to right bottom, #bdc3c7, #2c3e50)";
          } else if (weatherCondition === "Thunderstorm") {
            weatherIcon.src = "images/storm.png";
            audio.src = "thunderwithrain.wav";
            document.querySelector("body").style.background =
              "linear-gradient(to right bottom, #232526, #414345)";
          } else if (
            weatherCondition === "Dust" ||
            weatherCondition === "Smoke" ||
            weatherCondition === "Sand"
          ) {
            audio.src = "wind.wav";
            weatherIcon.src = "images/smokey1.png";
            document.querySelector("body").style.background =
              "linear-gradient(to right bottom, #FFA17F, #00223E)";
            // document.querySelector("body").style.background =
            //   "linear-gradient(to right bottom, #1e130c, #9a8478)";
          } else if (weatherCondition === "Rain") {
            audio.src = "drizzle.mp3";
            weatherIcon.src = "images/rain.png";
            document.querySelector("body").style.background =
              "linear-gradient(to right bottom, #093028, #237A57)";
          } else if (weatherCondition === "Snow") {
            weatherIcon.src = "images/snow.png";
            audio.src = "wind.wav";
            document.querySelector("body").style.background =
              "linear-gradient(to right bottom, #2c3e50, #3498db)";
          } else {
            console.log("error hai");
          }
          // Display weather content
          document.querySelector(".weatherContent").style.display = "block";
          // Hidden welcome and error display
          document.querySelector(".welcomeAnderror").style.display = "none";
          // Changing body background color
  
          console.log(response.data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error.data);
      });
  };
  const form = document.querySelector(".form");
  form.addEventListener("submit", currentWeather);