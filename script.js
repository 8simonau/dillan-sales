const bareme = {
  70: 0.3,
  71: 0.316111111111111,
  72: 0.332777777777778,
  73: 0.351111111111111,
  74: 0.367777777777778,
  75: 0.387777777777778,
  76: 0.407222222222222,
  77: 0.428888888888889,
  78: 0.45,
  79: 0.472777777777778,
  80: 0.493888888888889,
  81: 0.517777777777778,
  82: 0.541111111111111,
  83: 0.565,
  84: 0.587222222222222,
  85: 0.612777777777778,
  86: 0.612777777777778,
  87: 0.612777777777778,
  88: 0.612777777777778,
  89: 0.612777777777778,
  90: 0.612777777777778,
  91: 0.612777777777778,
  92: 0.612777777777778,
  93: 0.612777777777778,
  94: 0.612777777777778,
  95: 0.612777777777778,
  96: 0.612777777777778,
  97: 0.612777777777778,
  98: 0.612777777777778,
  99: 0.612777777777778,
  100: 0.612777777777778
};

const age = document.querySelector('#age');
const value = document.querySelector('#value');
const pricing = document.querySelector('#pricing');
const min = document.querySelector('#min');

const pricingButton = document.querySelector('#pricing-button');
const mapButton = document.querySelector('#map-button');

const pricingContainer = document.querySelector('#pricing-container');
const mapContainer = document.querySelector('#map-container');


const minValue = () => {
  const m = Math.max(Math.ceil(100000 / bareme[age.value]), 200000);
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
  const p = (parseInt(value.value) * bareme[age.value]);
  if (age.value < 70) {
    pricing.innerHTML = "Veuillez indiquer un âge supérieur à 70 ans";
    pricing.classList.add('error');
  } else if (value.value < value.min) {
    pricing.innerHTML = `Veuillez indiquer une valeur supérieure à ${value.min} €`;
    pricing.classList.add('error');
  } else {
    pricing.innerHTML = p.toLocaleString('fr', {maximumFractionDigits: 0, style: "currency", currency:"EUR"});
    pricing.classList.remove('error');
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
  center: [2.40, 47], // starting position [lng, lat]
  zoom: 5, // starting zoom
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
