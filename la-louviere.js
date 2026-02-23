import config from "./config.js"
export function laLouviere(myMarkers){
    fetch(config.apiLaLouviere)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(el => {
            L.marker([el.geopoint.lat, el.geopoint.lon]).addTo(myMarkers)
        });
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}