import config from "./config.js"
export async function travaux(myMarkers) {
  //const url = "https://www.odwb.be/api/explore/v2.1/catalog/datasets/infos-travaux/records";

  try {
    const response = await fetch(config.apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const worksIcon = L.divIcon({
  className: "custom-marker",
  html: `
    <div style="
      background:#0AD3FF;
      width:20px;
      height:20px;
      border-radius:50%;
      border:3px solid #023C40;
    ">🚻</div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});
    
    data.results.forEach(record => {
      const lat = record.geo_point_2d.lat
      const lng = record.geo_point_2d.lon
     L.marker([lat, lng], { icon: worksIcon }).addTo(myMarkers).bindPopup(`<a href="${record.url}" target="_blank">Plus d'info</a>`)
    })

  } catch (error) {
    console.error("Erreur :", error);
  }
}