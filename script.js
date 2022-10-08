const container = document.querySelector(".container");
const form = document.querySelector(".form");
const content = document.querySelector(".container");
async function weatherAt(town) {
  let name = town.toLowerCase();
  let weatherData;
  try {
    let weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=d77ad747ab5532b783b0d347e569be65`
    );
    weatherData = await weather.json();
  } catch (error) {
    if (error) {
      return;
    }
  }
  if (weatherData.cod === "404") {
    alert(weatherData.message);
    show("nairobi");
    return;
  }

  let { temp, humidity, pressure } = weatherData.main;
  let { speed, deg } = weatherData.wind;
  let { main, description } = weatherData.weather[0];
  let { country } = weatherData.sys;

  let celcius = Math.round(temp - 273.15);
  return {
    country,
    main: { main, description },
    wind: { speed, deg },
    temp: { celcius },
    humidity,
    pressure,
  };
}

async function show(town) {
  let data = await weatherAt(town);

  while (content.children.length > 0) {
    content.lastChild.remove();
  }
  let main = document.createElement("div");
  main.classList.add("main");
  main.innerHTML = `<h2>${town}, ${data.country}</h2>
  <h3>${data.temp.celcius}&deg;</h3>
  <p>${data.main.description}</p>`;

  let otherDiv = document.createElement("div");
  otherDiv.classList.add("other");
  otherDiv.innerHTML = `<ul>
  <li>
    <h3>wind</h3>
    <p> speed: ${data.wind.speed}</p>
    <p> degree : ${data.wind.deg}</p>
  </li>
  <li>
    <h3>humidity</h3>
    <p>${data.humidity}</p>
  </li>
  <li>
    <h3>${data.main.main}</h3>
    <p>${data.main.description}</p>
  </li>
</ul>`;

  content.appendChild(main);
  content.appendChild(otherDiv);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = form.elements["city"].value;
  show(city);
  form.elements["city"].value = "";
});

document.addEventListener("DOMContentLoaded", show("nairobi"));
