<template>
    <div></div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '../../stores/auth'

export default {
    name: 'CallbackAuth',
    data() {
        return {
            authStore: useAuthStore()
        }
    },
    methods: {
        fetchAccessToken(code) {
            // url
            const url = 'https://accounts.spotify.com/api/token'
            // body 
            let body = "grant_type=authorization_code"
            body += "&code=" + code
            body += "&redirect_uri=" + import.meta.env.VITE_API_SPOTIFY_REDIRECT_URI
            body += "&client_id=" + import.meta.env.VITE_API_SPOTIFY_CLIENT_ID
            body += "&client_secret=" + import.meta.env.VITE_API_SPOTIFY_CLIENT_SECRET
            // headers
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(import.meta.env.VITE_API_SPOTIFY_CLIENT_ID + ':' + import.meta.env.VITE_API_SPOTIFY_CLIENT_SECRET)
            }
            // request
            axios.post(url, body, { headers: headers })
                .then(response => {
                    // tokens
                    const access_token = response.data.access_token
                    const refresh_token = response.data.refresh_token
                    const expires_in = response.data.expires_in
                    // store tokens
                    this.authStore.login(access_token, refresh_token, expires_in)
                    // toast
                    this.$toast.success("You have successfully logged in.")
                })
                .catch(error => {
                    console.log(error)
                    // toast
                    this.$toast.error("An error occurred while trying to log in, please try again.")
                })
                .finally(() => {
                    // redirect
                    this.$router.push({ name: 'home' })
                })
        }
    },
    mounted() {
        this.fetchAccessToken(this.$route.query.code)
    }
}
</script>