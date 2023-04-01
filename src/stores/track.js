import { defineStore } from 'pinia';
import axios from 'axios';

export const useTrackStore = defineStore('track', {
    state: () => ({
        trackLyrics: null,
    }),
    actions: {
        async getLyrics(trackId) {
            // reset lyrics before fetching new lyrics
            this.trackLyrics = null;
            // fetch lyrics
            try {
                const response = await axios.get(`https://spotify-lyric-api.herokuapp.com/?trackid=${trackId}`);
                this.trackLyrics = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
});