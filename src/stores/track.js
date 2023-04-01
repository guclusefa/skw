import { defineStore } from 'pinia';
import api from '../services/api';
import axios from 'axios';

export const useTrackStore = defineStore('track', {
    state: () => ({
        track: null,
        trackLyrics: null,
    }),
    actions: {
        async getTrack(trackId) {
            try {
                const response = await api.get(`/tracks/${trackId}`);
                this.track = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getLyrics(trackId) {
            // reset lyrics before fetching new lyrics
            this.trackLyrics = null;
            try {
                const response = await axios.get(`https://spotify-lyric-api.herokuapp.com/?trackid=${trackId}`);
                this.trackLyrics = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
});