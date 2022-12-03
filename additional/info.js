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
      return index?.rain ? index.rain : 0;
    });
    console.log(rain);
    // myChartSevenDays.config.data.labels = days;
    myChartSevenDays.config.data.datasets[0].data = rain;
    myChartSevenDays.update();
  });
}

// setup
const data = {
  labels: [
    "day #1",
    "day #2",
    "day #3",
    "day #4",
    "day #5",
    "day #6",
    "day #7",
  ],
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

/* chart TWO start*/

function updateChart48() {
  async function fetchData() {
    const api_url =
      "https://api.openweathermap.org/data/2.5/onecall?lat=43.13&lon=25.70&exclude={part}&units=metric&appid=f772a20134634b0f794019dc9184de0f";
    const response = await fetch(api_url);
    //wait until the request has completed
    const data48 = await response.json();
    console.log(data48);
    return data48;
  }
  fetchData().then((data48) => {
    /*days*/
    const hours = data48.hourly.map(function (index) {
      return index.dt;
    });
    console.log(hours);
    /*rain*/
    const rain = data48.hourly.map(function (index) {
      return index?.rain ? index.rain : 0;
    });
    console.log(rain);

    myChart48.config["_config"].data.datasets = hours;
    myChart48.config["_config"].datatwo.datasetstwo.data = rain;
    // console.log(datatwo.labelstwo);
    // console.log(myChart48.config["_config"].datatwo.datasetstwo.data = rain);
    myChart48.update();
  });
}

// setup
const datatwo = {
  labelstwo: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
  ],
  datasetstwo: [
    {
      label: "Forecast of 48 hours rain ammount",
      data: data,
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

// config
const config48 = {
  type: "bar",
  datatwo,
  options: {
    scales: {
      x: {
        type: "time",
      },
      y: {
        beginAtZero: true,
      },
    },
  },
};

// render init block

const myChart48 = new Chart(document.getElementById("myChart48"), config48);
