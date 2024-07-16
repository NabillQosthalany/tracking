import { defineStore } from "pinia";

export const useMapStore = defineStore("map", {
    state: () => ({
        result: [],
        titleTrip:'',
        estTime: 0,
    }),
    actions: {
        setResult(title) {
            this.result = title;
        },
        setTitleTrip(title) {
            this.titleTrip = title;
        },
        setEstTime(time) {
            this.estTime = time;
        }
    },
    getters: {
        getResult(state) {
            return state.result;
        },
        getTitleTrip(state) {
            return state.titleTrip;
        },
        getEstTime(state) { 
            return state.estTime;
        }
    },
});