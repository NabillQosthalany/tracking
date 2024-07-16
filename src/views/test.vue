<template>
    <div>
        <h1 class="text-blue-500">WebSocket Demo</h1>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';


const messages = ref([])
let ws
onMounted(() => {
    let socket = io.connect('https://tracking.asmat.app', { reconnect: true });

    // this.numberPlate = this.dataManifest.numberPlate

                socket.on('connect', function () {
                    console.log('connect')
                    socket.emit('storeClientInfo', { customId: 'D7940AS' });
                });
                socket.on('test', function (data) {
                    console.log(data)
                  });
                socket.on("users", (users) => {
                    users.forEach((user) => {
                        user.self = user.userID === socket.id;
                        initReactiveProperties(user);
                    });
                    this.users = users.sort((a, b) => {
                        if (a.self) return -1;
                        if (b.self) return 1;
                        if (a.username < b.username) return -1;
                        return a.username > b.username ? 1 : 0;
                    });
                });
                socket.on('getLongLat', function (message) {
                    console.log(message)
                })

    // ws.onmessage = (event) => {
    //     messages.value.push({id:messages.value.length, text: event.data})
    // }

    // ws.onopen = () => {
    //     ws.send('Hello, server!')
    // }

    // ws.onerror = (event) => {
    //     console.log(event)
    // }
}),

onUnmounted(() => {
    ws.close()
})
</script>

<style lang="scss" scoped>

</style>