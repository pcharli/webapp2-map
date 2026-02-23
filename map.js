import config from "./config.js"
import { getDeviceLocation } from "./geo.js"
import { travaux } from "./travaux.js"
//import { laLouviere } from "./la-louviere.js"
import { brussel } from "./brussel.js"  
import { initInstall } from './install.js';

// Lancement de la logique d'installation
initInstall();

async function init() {
  const location = await getDeviceLocation()
  console.log(location)
  if(location.lat) {
    config.lat = location.lat
    config.lng = location.lng
  }
  initMap()
}
init()


function initMap() {
// Initialisation de la carte
const map = L.map('map', {
  center: [config.lat, config.lng],
  zoom: 10,
  zoomControl: true
});


const sky = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
const normal = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// Couche OpenStreetMap
L.tileLayer(normal, {
  attribution: 'Cepegra'
}).addTo(map);

// Marqueur personnalisé (couleur palette)
const customIcon = L.divIcon({
  className: "custom-marker",
  html: `
    <div style="
      background:#0AD3FF;
      width:20px;
      height:20px;
      border-radius:50%;
      border:3px solid #023C40;
    "></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const bkPosition = {lat: 50.47653317221464, lng: 4.442330086261178}
const bkIcon = L.icon({
    iconUrl: 'bk.png',
    iconSize: [52, 52],
    iconAnchor: [16, 32],
  
});

// Ajout du marqueur
const marker = L.marker([config.lat, config.lng], { icon: customIcon }).addTo(map)
const bkMarker = L.marker([bkPosition.lat, bkPosition.lng], { icon: bkIcon }).addTo(map)

// Créer un calque pour les marqueurs ajoutés au clic
const myMarkers = L.layerGroup();
myMarkers.addTo(map);

// Popup au clic
marker.bindPopup("Je suis ici").openPopup()
bkMarker.bindPopup("Tous ici à midi")

// Afficher les coordonnées du point cliqué dans la console
/*
map.on('click', function(e) {
    const coords = e.latlng;
    console.log(`Coordonnées: latitude=${coords.lat}, longitude=${coords.lng}`);
    L.marker([coords.lat, coords.lng], { icon: customIcon }).addTo(myMarkers)
});
*/

// Bouton Reset pour nettoyer le calque
const $resetBtn = document.querySelector('#reset-btn');
$resetBtn.addEventListener('click', function() {
    myMarkers.clearLayers()
});


travaux(myMarkers)
//laLouviere(myMarkers)
brussel(map)
}