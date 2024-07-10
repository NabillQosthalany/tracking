<template>

  <div id="map" style="height: 500px;"></div>

</template>



<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import axios from 'axios';

const lon = ref('');
const data = ref([]);
let routing = null;

onMounted(async () => {
  try {
    const response = await axios.get('https://tracking.asmat.app/api/v1/manifest/91c22534c8ce17f0d247c53ebb4a746f');
    lon.value = response.data.manifest;
    data.value = response.data.manifest.outletList.map(outlet => ({
      lat: outlet.lat,
      lon: outlet.lon,
      nama: outlet.nama
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const map = L.map('map').setView([-7.7459039, 110.3622673], 13);

  var mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 20
    }).addTo(map);

    routing = L.Routing.control({
  waypoints: [
    L.latLng(57.74, 11.94),
    L.latLng(57.6792, 11.949)
  ]
}).addTo(map);
console.log(routing)

    


  // // Tambahkan marker untuk setiap data outlet
  // data.value.forEach(outlet => {

  //   L.marker([outlet.lat, outlet.lon]).addTo(map)

  //     .bindPopup(`<b>${outlet.nama}</b>`);
  // });

  // if(data.value.length > 1) {
  //   const latLngs = [
  //     [data.value[0].lat, data.value[0].lon],
  //     [data.value[1].lat, data.value[1].lon]
  //   ]
  //   const polyline = L.polyline(latLngs, { color: 'red' }).addTo(map);
  // }

});

</script>



<style>
#map {

  width: 100%;

  height: 100%;

}
</style>