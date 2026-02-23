import config from "./config.js"
export async function brussel(map) {
    try {
        const response = await fetch(config.apiUrlBrussel);
        const data = await response.json();
        const bxlMarkers = L.layerGroup();
        bxlMarkers.addTo(map);
        const waterIcon = ""
        data.results.forEach(el => {
            L.marker([el.geo_point_2d.lat, el.geo_point_2d.lon]).addTo(bxlMarkers).bindPopup(`<h1>${el.name_fr}</h1><p>${el.access_type_fr}</p>`)
        });
    } catch (error) {
        console.error('Erreur:', error);
    }
}