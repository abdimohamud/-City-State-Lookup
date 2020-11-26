const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const API_KEY = "AIzaSyByrkDhzlcDEL_G5EZqhODu8XiAtbGbsrk";
const cities = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

// function showPosition(position) {
//   // var latlon = ${position.latitude.replace('"',"")} + "," + ${position.longitude.replace('"',"")};
//   const lat = position.latitude;
//   const long = position.longitude;
//   var img_url = `https://www.google.com/maps/embed/v1/view?key=${API_KEY}&center=${lat},${long}&zoom=18&maptype=satellite`;
//   return `<iframe
//  width="400"
//  height="250"
//  frameborder="0" style="border:0" src=${img_url}></iframe>`;
//   // return `<img src='${img_url}'>`;
// }

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">Population:${numberWithCommas(
          place.population
        )}<br/><span class="rank">Rank:${place.rank}</span></span>
        <button><a class="map" href="https://maps.google.com/?ll=${
          place.latitude
        },${
        place.longitude
      }" target="_blank"> Click Me to see a Map!</a> </button>
      </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
