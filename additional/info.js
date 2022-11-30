//Fetch block

/*chart ONE start*/
function updateChart() {
  async function fetchData() {
    const api_url =
      "https://api.openweathermap.org/data/2.5/onecall?lat=43.13&lon=25.70&exclude={part}&units=metric&appid=f772a20134634b0f794019dc9184de0f";
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
      return index.rain;
    });
    console.log(rain);
    myChartSevenDays.config.data.labels = days;
    myChartSevenDays.config.data.datasets[0].data = rain;
    myChartSevenDays.update();
  });
}

// setup
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Forecast of rain ammount",
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

// config
const config = {
  type: "bar",
  data,
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
/*chart ONE end*/
