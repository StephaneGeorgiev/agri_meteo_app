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
const marker29 = L.marker([41.568098, 23.282287]).addTo(map);
const marker30 = L.marker([41.838469, 23.488801]).addTo(map);

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
           <p class="temp"> Temperature: ${temp}&deg C</p>
           <p class="pressure"> Pressure: ${pressure} hPa</p>
           <p class="humidity"> Humidity: ${humidity} %</p>
           <div class="icon-container">
           <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="w-icon">
            </div>
           <p>Expected rain for the next hour: ${
             rain ? rain.rain["1h"] + "mm" : "none"
           }
            </p>
            <p class="wind-deg">Wind direction: ${wind_deg}&deg;</p>
            <p class="wind-speed">Wind speed: ${wind_speed} m/s</p>
         </div>`;

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
            return index.rain ? index.rain : 0;
          });

          const rainHours = data.hourly.map(function (index) {
            return index.rain ? index.rain["1h"] : 0;
          });
          const timestamps = data.hourly.map(function (index) {
            return index.dt;
          });

          console.log(rain);
          console.log(rainHours);
          console.log(timestamps);

          myChartSevenDays.config.data.datasets[0].data = rain;
          myChartSevenDays.update();

          myChart2.confh.data.datasets[0].data = rainHours;
          myChart2.update();
        });
      });
  })
);

const arrHours = [];
console.log(arrHours);
const info = document.querySelector(".info");
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

// /*chart 2  */

// const data2 = {
//   labels: [
//     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
//     22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
//     41, 42,
//   ],
//   datasets: [
//     {
//       label: "48 hours forecast of rain ammount",
//       data: [18, 12, 6, 9, 12, 3, 9, 11],

//       backgroundColor: ["rgba(54, 162, 235, 0.1)"],
//       borderColor: ["rgba(54, 162, 235, 1)"],
//       borderWidth: 1,
//     },
//   ],
// };

// // config
// const confh = {
//   type: "bar",
//   data: data2,
//   plugins: [ChartDataLabels],
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// };

// // render init block
// const myChart2 = new Chart(document.getElementById("myChart2"), confh);

/*map details */
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
