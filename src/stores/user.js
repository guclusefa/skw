import { defineStore } from 'pinia';
import api from '../services/api';

export const useUserStore = defineStore('user', {
    // state
    state: () => ({
        topTracks: null,
        topArtists: null,
        topGenres: null,
    }),
    // actions
    actions: {
        async getTopTracks() {
            const response = await api.get('/me/top/tracks', {
                params: {
                    limit: 50,
                },
            });
            this.topTracks = response.data.items;
        },
        async getTopArtists() {
            const response = await api.get('/me/top/artists', {
                params: {
                    limit: 50,
                },
            });
            this.topArtists = response.data.items;
        },
    },
});