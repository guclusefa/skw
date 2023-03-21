import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
    // states
    state: () => ({
        access_token: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).access_token : null,
        refresh_token: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).refresh_token : null,
        expires_in: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).expires_in : null,
        user: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).user : null,
    }),
    // actions
    actions: {
        async login(access_token, refresh_token, expires_in) {
            // set tokens
            this.access_token = access_token
            this.refresh_token = refresh_token
            this.expires_in = new Date().getTime() + (expires_in * 1000)
            // get user
            const response = await api.get('/me');
            this.user = response.data
            // local storage auth
            localStorage.setItem('auth', JSON.stringify({
                access_token: this.access_token,
                refresh_token: this.refresh_token,
                expires_in: this.expires_in,
                user: this.user,
            }))
        },
        logout() {
            // clear tokens
            this.access_token = null
            this.refresh_token = null
            this.expires_in = null
            this.user = null
            // clear local storage auth
            localStorage.removeItem('auth')
        },
    },
    // getters
    getters: {
        isLoggedIn() {
            return this.access_token !== null
        },
        isFullyLoggedIn() {
            return this.access_token !== null && this.user !== null && new Date().getTime() < this.expires_in
        }
    },
})