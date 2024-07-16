<template>
    <div id="map" style="height: 600px;"></div>
</template>



<script setup>
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet-routing-machine';
import 'leaflet-rotatedmarker';
import { io } from 'socket.io-client';
import { useRoute } from 'vue-router';
import { useMapStore } from '../store/map';
import animationData from '../assets/marker.json';

const lon = ref('');
const data = ref([]);
const dataRoute = ref(null);
const result = ref([]);
const route = useRoute();
const mapStore = useMapStore();
const numberPlate = ref(0);
const estTime = ref(0);

let socket = null
let routingWayPoint
let marker
let map

const lottieOptions = ref({
    animationData: animationData,
    loop: true,
    autoplay: true,
});
const customIcon = L.icon({
    iconUrl: '/images/Car.png',
    iconSize: [20, 40],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0]
});

const testIcon = L.icon({
    iconUrl: '/images/ic-pin.png',
    iconSize: [40, 50],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    className: 'test-icon'
});

watch(estTime, (newVal) => {
    mapStore.setEstTime(newVal);
});

const initializeSocket = () => {
    socket = io.connect('https://tracking.asmat.app', { reconnect: true });

    socket.on('connect', () => {
        socket.emit('storeClientInfo', { customId: numberPlate.value });
    });

    socket.on('users', updateUsers);

    socket.on('getLongLat', updateMarker);

    const initialCoordinates = data.value[0] || { lat: 0, lon: 0 };
    const { lat: initialLat, lon: initialLon } = initialCoordinates;
};

const updateUsers = (users) => {
    this.users = users.map((user) => ({
        ...user,
        self: user.userID === socket.id,
    })).sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        return a.username.localeCompare(b.username);
    });
};

const updateMarker = ({ location }) => {
    console.log('location', location)
    const { latitude, longitude, course } = location;
    const newCoordinates = [latitude, longitude];
    const rotationAngle = course;
    estTime.value = routingWayPoint._selectedRoute.summary.totalDistance
    let time = Math.round(estTime.value / 60)
    if(time >= 60) {
        let hours = Math.floor(time / 60);
        let minutes = time % 60;
        time = `${hours} Jam ${minutes} Menit`;
    } else {
        time = `${time} Menit`;
    }
    console.log(time)
    mapStore.setEstTime(time)
    

    if (!marker) {
        marker = L.marker(newCoordinates, { icon: customIcon, zIndexOffset: 99999 }).addTo(map);
    } else {
        marker.setLatLng(newCoordinates);
        marker.setRotationAngle(rotationAngle);
    }
};

onMounted(async () => {
    let manifestId = route.params.manifestId

    try {
        map = L.map('map', { zoomControl: false }).setView([-0.789275, 113.921327], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 20
        }).addTo(map);

        /* Fetch Api Tracking */

        const response = await axios.get(`https://tracking.asmat.app/api/v1/manifest/${manifestId}`);
        numberPlate.value = response.data.manifest.numberPlate
        const reverseData = response.data.manifest.outletList.reverse();
        console.log(response.data.manifest)

        /* Set Data Trip To Store */
        mapStore.setResult(response.data.manifest)
        mapStore.setTitleTrip(reverseData[0])

        dataRoute.value = getRoute(reverseData)
        lon.value = response.data.manifest;
        data.value = reverseData.map(outlet => ({
            lat: outlet.lat,
            lon: outlet.lon,
            nama: outlet.nama
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    initializeSocket();

    routingWayPoint = L.Routing.control({
        draggableWaypoints: false,
        waypoints: dataRoute.value,
        addWaypoints: false,
        show: false,
        lineOptions: {
            styles: [{
                color: '#4161AC',
                opacity: 1,
                weight: 10
            }]
        },
        createMarker: function (i, wp, nWps) {
            let marker
            if (i === 0) {
                marker = L.marker(wp.latLng, {
                    icon: customIcon,
                });
            } else {
                marker = L.marker(wp.latLng, {
                    icon: testIcon,
                });
            }
            marker.on('add', function () {
                var icon = marker._icon;
                if (icon && icon.classList.contains('test-icon')) {
                    icon.classList.add('bouncing-icon');
                }
            });
            return marker;
        }
    }).addTo(map);
})
const getRoute = (waypoints) => {
    let temp = []
    if (waypoints) {
        for (let i = 0; i < waypoints?.length; i++) {
            temp.push(L.latLng(waypoints[i].lat, waypoints[i].lon))
        }
        dataRoute.value = temp
        return temp
    }
}
</script>



<style>
#map {
    width: 100%;
    height: 100%;
}

.leaflet-routing-container {
    display: none !important;
}

.leaflet-control-attribution {
    display: none !important;
}


@keyframes wave {
    0% {
        box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7);
    }

    70% {
        box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
    }
}

.bouncing-icon {
    border-radius: 100%;
    position: absolute;
    animation: wave 2s infinite;
    transform-origin: center center;
}
</style>