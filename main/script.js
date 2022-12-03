const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");
const btnEl = document.querySelector(".more-info");
const map = L.map("map").setView([42.7339, 25.4858], 7);
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

const api_url_one = `https://api.openweathermap.org/data/2.5/onecall?lat=43.13&lon=25.70&exclude={part}&units=metric&appid=f772a20134634b0f794019dc9184de0f`;
const api_url_two = `https://api.openweathermap.org/data/2.5/onecall?lat=42.69&lon=23.31&exclude={part}&units=metric&appid=f772a20134634b0f794019dc9184de0f`;

getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(api_url_one)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        fetch(api_url_two)
          .then((res) => res.json())
          .then((dataTwo) => {
            console.log(dataTwo);

            /*map*/
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
              maxZoom: 9,
              attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);

            let { temp } = data.current;
            let { rain } = data.hourly[0];
            let tempSF = dataTwo.current.temp;
            let rainSF = dataTwo.hourly[0].rain;
            /* popUps settings SOFIA*/
            const popupSF = L.popup({
              maxWidth: 700,
            }).setContent(`<div class="weather-item">
        
        <div>Current temperature is ${tempSF}&deg;</div>
    </div>
        <div>Expected rain for the next hour: ${
          rainSF ? rainSF + "mm" : "none"
        } </div>
        <a href="/additional/info.html">More indormation</a>
    </div>`);

            /* popUps settings SOFIA*/
            const popupVT = L.popup({
              maxWidth: 400,
            }).setContent(`<div class="weather-item">
        
        <div>Current temperature is ${temp}&deg;</div>
    </div>
        <div>Expected rain for the next hour: ${
          rain ? rain + "mm" : "none"
        } </div>
        <a href="/additional/info.html">More indormation</a>
    </div>`);

            /* icons settings*/
            const blackIcon = L.icon({
              iconUrl: "iconBlack.svg",
              iconSize: [32, 37],
              iconAnchor: [16, 37],
              popupAnchor: [0, -30],
            });

            const RedIcon = L.icon({
              iconUrl: "iconRed.svg",
              iconSize: [32, 37],
              iconAnchor: [16, 37],
              popupAnchor: [0, -30],
            });

            /*display markers and change colors*/
            // const markers = [];
            // const coordinates = [
            //   [43.13, 25.7],
            //   [42.698334, 23.319941],
            // ];

            const markerSF = L.marker([42.698334, 23.319941], {
              icon: blackIcon,
            })
              .on("mouseover", function (e) {
                e.target.setIcon(RedIcon);
              })
              .bindPopup(popupSF)
              .addTo(map);

            const markerVT = L.marker([43.13, 25.7], { icon: blackIcon })
              .on("mouseover", function (e) {
                e.target.setIcon(RedIcon);
              })
              .bindPopup(popupVT)
              .addTo(map);

            const markers = [markerSF, markerVT];
            // coordinates.forEach(function (coords) {
            //   const marker = L.marker(coords, { icon: blackIcon }).on(
            //     "mousemove",
            //     function (e) {
            //       e.target.setIcon(RedIcon);
            //     }
            //   );
            //   markers.push(marker);
            // });

            // const featureGroup = L.featureGroup(markers)
            //   .bindPopup(popup)
            //   .addTo(map);

            // map.fitBounds(featureGroup.getBounds(), {
            //   padding: [20, 20],
            // });

            const options = { units: "kilometers" };
            map.on("mousemove", function (e) {
              // console.log(e);
              const from = turf.point([e.latlng.lat, e.latlng.lng]);
              markers.forEach(function (marker) {
                const to = turf.point([
                  marker.getLatLng().lat,
                  marker.getLatLng().lng,
                ]);
                const distance = turf.distance(from, to, options);
                if (distance < 85) {
                  marker.setIcon(RedIcon);
                } else {
                  marker.setIcon(blackIcon);
                }
              });
            });

            showWeatherData(data);
          });
      });

    function showWeatherData(data) {
      let { humidity, pressure, sunrise, sunset, wind_speed, temp } =
        data.current;

      timezone.innerHTML = `The used timezone is ${data.timezone}`;
      countryEl.innerHTML = data.lat + "N " + data.lon + "E";

      currentWeatherItemsEl.innerHTML = `<div class="weather-item">
        <div>Humidity</div>
        <div>${Math.round(humidity)}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${Math.round(pressure)} </div>
    </div>
    <div class="weather-item">
        <div>Temp</div>
        <div>${Math.round(temp)} &#176;C</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${Math.round(wind_speed)}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
    </div>
    
    `;

      let otherDayForcast = "";
      data.daily.forEach((day, idx) => {
        if (idx == 0) {
          currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${
              day.weather[0].icon
            }@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window
                  .moment(day.dt * 1000)
                  .format("dddd")}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
                <div class="temp">Rain - ${day.rain}mm</div>
            </div>
            `;
        } else {
          otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window
                  .moment(day.dt * 1000)
                  .format("ddd")}</div>
                <img src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
                <div class="temp">Rain - ${
                  day?.rain ? day.rain + "mm" : "not expected"
                } </div>
            </div>
            `;
        }
      });

      weatherForecastEl.innerHTML = otherDayForcast;
    }
  });
}
