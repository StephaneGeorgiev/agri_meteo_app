const map = L.map("map").setView([42.1354, 24.7453], 7);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// L.tileLayer(
//   "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//   {
//     attribution:
//       '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   }
// ).addTo(map);

/*Different markers with icons */
const RedIcon = L.icon({
  iconUrl: "iconRed_two.svg",
  iconSize: [32, 37], // size of the icon
  iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

const blackIcon = L.icon({
  iconUrl: "iconBlack_two.svg",
  iconSize: [32, 37], // size of the icon
  iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

const marker1 = L.marker([42.011944, 23.089722]).addTo(map);
const marker2 = L.marker([42.502965, 27.470179]).addTo(map);
const marker3 = L.marker([43.211375, 27.91108]).addTo(map);
const marker4 = L.marker([43.078652, 25.628291]).addTo(map);
const marker5 = L.marker([43.98869, 22.874058]).addTo(map);
const marker6 = L.marker([43.212108, 23.544412]).addTo(map);
const marker7 = L.marker([42.874242, 25.31784]).addTo(map);
const marker8 = L.marker([43.562212, 27.83189]).addTo(map);
const marker9 = L.marker([41.65, 25.367]).addTo(map);
const marker10 = L.marker([42.279668, 22.687015]).addTo(map);
const marker11 = L.marker([43.134777, 24.711535]).addTo(map);
const marker12 = L.marker([43.405487, 23.224242]).addTo(map);
const marker13 = L.marker([42.193477, 24.332755]).addTo(map);
const marker14 = L.marker([42.599828, 23.030805]).addTo(map);
const marker15 = L.marker([43.413188, 24.616916]).addTo(map);
const marker16 = L.marker([42.142086, 24.741454]).addTo(map);
const marker17 = L.marker([43.540895, 26.528818]).addTo(map);
const marker18 = L.marker([43.844532, 25.953907]).addTo(map);
const marker19 = L.marker([44.109238, 27.265381]).addTo(map);
const marker20 = L.marker([42.678146, 26.325963]).addTo(map);
const marker21 = L.marker([41.575278, 24.712778]).addTo(map);
const marker22 = L.marker([42.472914, 23.819449]).addTo(map);
const marker23 = L.marker([42.690349, 23.3375]).addTo(map);
const marker24 = L.marker([42.425668, 25.634595]).addTo(map);
const marker25 = L.marker([43.252021, 26.568876]).addTo(map);
const marker26 = L.marker([41.931947, 25.559988]).addTo(map);
const marker27 = L.marker([43.267849, 26.937878]).addTo(map);
const marker28 = L.marker([42.481692, 26.497799]).addTo(map);
const marker29 = L.marker([41.838469, 23.488801]).addTo(map);
const marker30 = L.marker([41.568098, 23.282287]).addTo(map);

const markers = [
  marker1,
  marker2,
  marker3,
  marker4,
  marker5,
  marker6,
  marker7,
  marker8,
  marker9,
  marker10,
  marker11,
  marker12,
  marker13,
  marker14,
  marker15,
  marker16,
  marker17,
  marker18,
  marker19,
  marker20,
  marker21,
  marker22,
  marker23,
  marker24,
  marker25,
  marker26,
  marker27,
  marker28,
  marker29,
  marker30,
];

markers.forEach((marker) => {
  marker.setIcon(blackIcon);
});

markers.forEach((mr) =>
  mr.on("click", function (e) {
    const x = e.latlng.lat.toFixed(2);
    const y = e.latlng.lng.toFixed(2);
    console.log(x, y);

    /*fetch*/
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${x}&lon=${y}&exclude={part}&units=metric&appid=f772a20134634b0f794019dc9184de0f`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        let { temp } = data.current;
        let { pressure } = data.current;
        let { humidity } = data.current;
        let { icon } = data.current.weather[0];
        let { wind_deg } = data.current;
        let { wind_speed } = data.current;

        let rain = data.hourly[0]?.rain ? data.hourly[0].rain : 0;

        console.log(temp);
        console.log(rain);
        console.log(wind_deg);
        slide.classList.toggle("slide-in-in");

        info.innerHTML = `
        <div class="info">
        <p class="temp">Temperature is ${temp}&deg;</p>
        <p class="pressure">Pressure: ${pressure} hPa</p>
        <p class="humidity">Humidity:${humidity} %</p>
        <p class="wind-deg">Wind direction:${wind_deg}&deg;</p>
        <p class="wind-speed">Wind speed: ${wind_speed}m/s;</p>
        <p>Expected rain for the next hour: ${
          rain ? rain["1h"] + "mm" : "none"
        }</p>
        <div class="icon-container">
          <img
            src="http://openweathermap.org/img/wn/${icon}@2x.png"
            alt="weather icon"
            class="w-icon"
          />
        </div>
        </div>
      `;

        /*fetch data for chart*/
        async function fetchData() {
          const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${x}&lon=${y}&exclude={part}&units=metric&appid=f772a20134634b0f794019dc9184de0f`;
          const response = await fetch(api_url);
          //wait until the request has completed
          const data = await response.json();
          console.log(data);
          return data;
        }
        fetchData().then((data) => {
          /*days*/
          const days = data.daily.map(function (index) {
            return index.dt;
          });

          console.log(days);

          /*rain*/
          const rain = data.daily.map(function (index) {
            // console.log(index.rain);
            return index.rain ? index.rain : 0;
          });

          const rainHours = data.hourly.map(function (index) {
            return index.rain ? index.rain["1h"] : 0;
          });
          console.log(rain);
          console.log(rainHours);

          /*try*/
          // let rain = data.hourly[0]?.rain ? data.hourly[0].rain : 0;
          let pop0N = data.daily[0].pop;

          let temp0D = data.daily[0].temp.day;
          let rain0 = data.daily[0]?.rain || 0;
          let pop1N = data.daily[1].pop;
          let temp1D = data.daily[1].temp.day;
          let rain1 = data.daily[1]?.rain || 0;
          let pop2N = data.daily[2].pop;
          let temp2D = data.daily[2].temp.day;
          let rain2 = data.daily[2]?.rain || 0;
          let pop3N = data.daily[3].pop;
          let temp3D = data.daily[3].temp.day;
          let rain3 = data.daily[3]?.rain || 0;
          let pop4N = data.daily[4].pop;
          let temp4D = data.daily[4].temp.day;
          let rain4 = data.daily[4]?.rain || 0;
          let pop5N = data.daily[5].pop;
          let temp5D = data.daily[5].temp.day;
          let rain5 = data.daily[5]?.rain || 0;
          let pop6N = data.daily[6].pop;
          let temp6D = data.daily[6].temp.day;
          let rain6 = data.daily[6]?.rain || 0;

          pop0ElN.textContent = `Probability for rain: ${pop0N}%`;
          temp0ElD.textContent = `Day: ${temp0D}`;
          rain0El.textContent = `Rain: ${rain0 ? rain0 + "mm" : "none"}`;

          pop1ElN.textContent = `Probability for rain: ${pop1N}%`;
          temp1ElD.textContent = `Day: ${temp1D}`;
          rain1El.textContent = `Rain: ${rain1 ? rain1 + "mm" : "none"}`;

          pop2ElN.textContent = `Probability for rain: ${pop2N}%`;
          temp2ElD.textContent = `Day: ${temp2D}`;
          rain2El.textContent = `Rain: ${rain2 ? rain2 + "mm" : "none"}`;

          pop3ElN.textContent = `Probability for rain: ${pop3N}%`;
          temp3ElD.textContent = `Day: ${temp3D}`;
          rain3El.textContent = `Rain: ${rain3 ? rain3 + "mm" : "none"}`;

          pop4ElN.textContent = `Probability for rain: ${pop4N}%`;
          temp4ElD.textContent = `Day: ${temp4D}`;
          rain4El.textContent = `Rain: ${rain4 ? rain4 + "mm" : "none"}`;

          pop5ElN.textContent = `Probability for rain: ${pop5N}%`;
          temp5ElD.textContent = `Day: ${temp5D}`;
          rain5El.textContent = `Rain: ${rain5 ? rain5 + "mm" : "none"}`;

          pop6ElN.textContent = `Probability for rain: ${pop6N}%`;
          temp6ElD.textContent = `Day: ${temp6D}`;
          rain6El.textContent = `Rain: ${rain6 ? rain6 + "mm" : "none"}`;

          /*try*/

          myChartSevenDays.config.data.datasets[0].data = rain;
          myChartSevenDays.update();
        });
      });
  })
);

const info = document.querySelector(".info");
console.log(info);
const slide = document.querySelector(".slide-in");
const temp = document.querySelector(".temp");

const data = {
  labels: [
    "day 1",
    "day 2",
    "day 3",
    "day 4",
    "day 5",
    "day 6",
    "day 7",
    "day 8",
  ],
  datasets: [
    {
      label: "8 days Forecast of rain ammount",
      data: [18, 12, 6, 9, 12, 3, 9, 11],
      backgroundColor: ["rgba(54, 162, 235, 0.1)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

// config
const config = {
  type: "bar",
  data,

  plugins: [ChartDataLabels],
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// render init block

const myChartSevenDays = new Chart(
  document.getElementById("myChartSevenDays"),
  config
);

const options = { units: "kilometers" };

map.on("mousemove", function (e) {
  // console.log(e);
  const from = turf.point([e.latlng.lat, e.latlng.lng]);
  markers.forEach(function (marker) {
    const to = turf.point([marker.getLatLng().lat, marker.getLatLng().lng]);
    const distance = turf.distance(from, to, options);
    if (distance < 30) {
      marker.setIcon(RedIcon);
    } else {
      marker.setIcon(blackIcon);
    }
  });
});

const provincesGeoJSON = false;
fetch("/provinces.json", {
  method: "GET",
})
  .then((response) => response.json())
  .then((json) => {
    const geojson = L.geoJSON(json.features, {
      style: function (feature) {
        return {
          fillOpacity: 0,
          weight: 0.3,
        };
      },
      onEachFeature: function (feature, layer) {
        layer.on("mouseover", function () {
          layer.setStyle({ fillOpacity: 0.3 });
        });
        layer.on("mouseout", function () {
          layer.setStyle({ fillOpacity: 0 });
        });
      },
    }).addTo(map);
  });

const pop0ElN = document.querySelector(".pop0");
const temp0ElD = document.querySelector(".temp0D");
const rain0El = document.querySelector(".rain0");

const pop1ElN = document.querySelector(".pop1");
const temp1ElD = document.querySelector(".temp1D");
const rain1El = document.querySelector(".rain1");

const pop2ElN = document.querySelector(".pop2");
const temp2ElD = document.querySelector(".temp2D");
const rain2El = document.querySelector(".rain2");

const pop3ElN = document.querySelector(".pop3");
const temp3ElD = document.querySelector(".temp3D");
const rain3El = document.querySelector(".rain3");

const pop4ElN = document.querySelector(".pop4");
const temp4ElD = document.querySelector(".temp4D");
const rain4El = document.querySelector(".rain4");

const pop5ElN = document.querySelector(".pop5");
const temp5ElD = document.querySelector(".temp5D");
const rain5El = document.querySelector(".rain5");

const pop6ElN = document.querySelector(".pop6");
const temp6ElD = document.querySelector(".temp6D");
const rain6El = document.querySelector(".rain6");
