import { defineStore } from 'pinia';
import axios from 'axios';

export const useTrackStore = defineStore('track', {
    // state
    state: () => ({
        trackLyrics: null,
    }),
    // actions
    actions: {
        async getLyrics(trackId) {
            const response = await axios.get(`https://spotify-lyric-api.herokuapp.com/?trackid=${trackId}`);
            this.trackLyrics = response.data;
        },
    },
});