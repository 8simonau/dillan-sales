fetch("https://api.chucknorris.io/jokes/random")
  .then(response => response.json())
  .then(data => document.querySelector('#chuck').innerHTML = data.value);

const bareme = {
  70: {"taux": 0.3, "edv": 22.7},
  71: {"taux": 0.316111111111111, "edv": 21.7},
  72: {"taux": 0.332777777777778, "edv": 20.7},
  73: {"taux": 0.351111111111111, "edv": 19.7},
  74: {"taux": 0.367777777777778, "edv": 18.8},
  75: {"taux": 0.387777777777778, "edv": 17.8},
  76: {"taux": 0.407222222222222, "edv": 16.9},
  77: {"taux": 0.428888888888889, "edv": 15.9},
  78: {"taux": 0.45, "edv": 15},
  79: {"taux": 0.472777777777778, "edv": 14.1},
  80: {"taux": 0.493888888888889, "edv": 13.3},
  81: {"taux": 0.517777777777778, "edv": 12.4},
  82: {"taux": 0.541111111111111, "edv": 11.6},
  83: {"taux": 0.565, "edv": 10.8},
  84: {"taux": 0.587222222222222, "edv": 10.1},
  85: {"taux": 0.612777777777778, "edv": 9.3},
  86: {"taux": 0.612777777777778, "edv": 9.1},
  87: {"taux": 0.612777777777778, "edv": 8.4},
  88: {"taux": 0.612777777777778, "edv": 7.8},
  89: {"taux": 0.612777777777778, "edv": 7.2},
  90: {"taux": 0.612777777777778, "edv": 6.7},
  91: {"taux": 0.612777777777778, "edv": 6.2},
  92: {"taux": 0.612777777777778, "edv": 5.8},
  93: {"taux": 0.612777777777778, "edv": 5.5},
  94: {"taux": 0.612777777777778, "edv": 5.2},
  95: {"taux": 0.612777777777778, "edv": 4.8},
  96: {"taux": 0.612777777777778, "edv": 4.6},
  97: {"taux": 0.612777777777778, "edv": 4.3},
  98: {"taux": 0.612777777777778, "edv": 4},
  99: {"taux": 0.612777777777778, "edv": 3.7},
  100: {"taux": 0.612777777777778, "edv": 3.5}
};

const age = document.querySelector('#age');
const value = document.querySelector('#value');
const pricing = document.querySelector('#pricing');
const min = document.querySelector('#min');
const percentage = document.querySelector('#percentage');
const nextAge = document.querySelector('#next-age');
const lifeExpectancy = document.querySelector('#life-expectancy');


const pricingButton = document.querySelector('#pricing-button');
const mapButton = document.querySelector('#map-button');

const pricingContainer = document.querySelector('#pricing-container');
const mapContainer = document.querySelector('#map-container');


const minValue = () => {
  const m = Math.max(Math.ceil(100000 / bareme[age.value].taux), 200000);
  if (age.value < 70) {
    min.innerHTML = ""
  } else {
    min.innerHTML = m.toLocaleString('fr', {maximumFractionDigits: 0, style: "currency", currency:"EUR"})
    value.min = m;
  }
  if (value.value < m) {
    value.value = m;
    calculatePricing();
  }
}

const calculatePricing = () => {
  const p = (parseInt(value.value) * bareme[parseInt(age.value)].taux);
  const q = (parseInt(value.value) * bareme[parseInt(age.value) + 1].taux);
  if (parseInt(age.value) < 70) {
    pricing.innerHTML = "Veuillez indiquer un âge supérieur à 70 ans";
    pricing.classList.add('error');
  } else if (parseInt(value.value) < parseInt(value.min)) {
    pricing.innerHTML = `Veuillez indiquer une valeur supérieure à ${value.min} €`;
    pricing.classList.add('error');
  } else {
    pricing.innerHTML = p.toLocaleString('fr', {maximumFractionDigits: 0, style: "currency", currency:"EUR"});
    pricing.classList.remove('error');
    percentage.innerHTML = `${(bareme[age.value].taux * 100).toFixed(1)}%`;
    nextAge.innerHTML = q.toLocaleString('fr', {maximumFractionDigits: 0, style: "currency", currency:"EUR"});
    lifeExpectancy.innerHTML = `${bareme[age.value].edv} ans`;
  }
}

[age, value].forEach((item) => {
  item.addEventListener('change', calculatePricing);
})

age.addEventListener('change', minValue);

pricingButton.addEventListener('click', () => {
  pricingButton.classList.remove('inactive');
  mapButton.classList.add('inactive');
  pricingContainer.classList.remove('inactive');
  mapContainer.classList.add('inactive');
})

mapButton.addEventListener('click', () => {
  pricingButton.classList.add('inactive');
  mapButton.classList.remove('inactive');
  pricingContainer.classList.add('inactive');
  mapContainer.classList.remove('inactive');
})

mapboxgl.accessToken = 'pk.eyJ1IjoiOHNpbW9uYXUiLCJhIjoiY2xwaXFxbWVwMDI3NTJubDZxa2g2dmtxbSJ9.BF_dr7VOxg6PixXHrEE-FQ';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/8simonau/clqo68jll00pi01qyfcs1enz5', // style URL
  center: [ 2.333333, 48.7], // starting position [lng, lat]
  zoom: 7.2, // starting zoom
});
// Add the control to the map.
map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl,
countries: "fr",
types: "place, postcode"
})
);
