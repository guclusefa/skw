import { defineStore } from 'pinia';
import api from '../services/api';

export const useUserStore = defineStore('user', {
    state: () => ({
        currentlyPlaying: null,
        topTracks: null,
        topArtists: null,
        playlists: null,
    }),
    actions: {
        async getCurrentlyPlaying() {
            const response = await api.get('/me/player/currently-playing');
            this.currentlyPlaying = response.data;
        },
        async playTrack() {
            await api.put('/me/player/play');
        },
        async pauseTrack() {
            await api.put('/me/player/pause');
        },
        async previousTrack() {
            await api.post('/me/player/previous');
        },
        async nextTrack() {
            await api.post('/me/player/next');
        },
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
        async getPlaylists() {
            const response = await api.get('/me/playlists', {
                params: {
                    limit: 50,
                },
            });
            this.playlists = response.data.items;
        },
    },
});