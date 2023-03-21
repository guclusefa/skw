import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
    // states
    state: () => ({
        access_token: null,
        refresh_token: null,
        expires_in: null,
        user: null,
    }),
    // actions
    actions: {
        async login(access_token, refresh_token, expires_in) {
            // set tokens
            this.access_token = access_token
            this.refresh_token = refresh_token
            this.expires_in = expires_in
            // get user
            const response = await api.get('/me');
            this.user = response.data;
            console.log('login', this.user)
        },
        logout() {
            this.access_token = null
            this.refresh_token = null
            this.expires_in = null
            this.user = null
        },
    },
    // getters
    getters: {
        isLoggedIn() {
            return this.access_token !== null
        }
    },
})