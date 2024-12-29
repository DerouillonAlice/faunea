<template>
  <div class="text-center p-4 bg-white2">
    <h1 class="text-3xl font-bold text-coral mb-4 font-dynapuff">
      Carte Interactive des Espèces Menacées
    </h1>
    <p class="text-lg mb-4">Cliquez sur les animaux pour en savoir plus sur chaque espèce !</p>
    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import speciesData from '../assets/especes.json';

export default {
  name: 'MapViews',
  mounted() {
    // Initialisation de la carte
    const map = L.map('map', {
      maxBounds: [
        [-90, -180],
        [90, 180]
      ],
      maxZoom: 10,
      minZoom: 2,
      maxBoundsViscosity: 0.0,
      worldCopyJump: true,
      // continuousWorld: true
    }).setView([48.11848409836725, -1.702553629875183], 3);

    // Ajout des tuiles Mapbox
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxpY2VkZXIiLCJhIjoiY20zaWl0amZlMDE0cDJxcjJwd2QxNW01ZyJ9.GL-ZjGPy5iW2wgGciWShOA',
      {
        attribution:
          '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1
      }
    ).addTo(map);

    // Ajout des marqueurs et des popups
    speciesData.forEach((species) => {
      const customIcon = L.icon({
        iconUrl: species.image,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, 16] // Popup s'ouvre en bas
      });

      const marker = L.marker([species.lat, species.lon], { icon: customIcon }).addTo(map);

      const popupContent = `
        <div class="popup-content p-4 bg-white rounded-lg shadow-lg max-w-xs">
          <img src="${species.image2}" alt="${species.name}" class="popup-image w-full h-48 object-cover rounded-lg mb-4"/>
          <h3 class="popup-title text-xl font-semibold text-green-600 mb-2">${species.name}</h3>
          <p><strong class="font-semibold">Statut de conservation:</strong> ${species.status}</p>
          <p><strong class="font-semibold">Menace:</strong> ${species.threat}</p>
          <p><strong class="font-semibold">Description:</strong> ${species.description}</p>
        </div>
      `;

      // Ajout de la popup
      marker.bindPopup(popupContent, {
        offset: L.point(0, 16), // Ajuste l'offset pour afficher en dessous
        autoPan: true,
        keepInView: true,
        autoPanPadding: [20, 20],
        className: 'custom-popup'
      });
    });
  }
};
</script>

<style scoped>
.map-container {
  width: 90%;
  height: 700px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.popup-content {
  font-size: 1rem;
  max-width: 250px;
  word-wrap: break-word;
}

.popup-title {
  color: #2d6a4f;
  margin-bottom: 10px;
}

.popup-image {
  border-radius: 10px;
  object-fit: cover;
}

.leaflet-popup-content-wrapper {
  transform: translateY(20px);
  /* Décale le contenu sous l'icône */
}

.leaflet-popup-tip {
  transform: rotate(180deg);
  /* Flèche vers le bas */
  bottom: -10px;
  top: auto;
}
</style>
