<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" required>
        </div>
        <div class="form-group mt-2">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required>
        </div>
        <div class="form-group mt-3">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
</template>
  
<script>
import SpotifyWebApi from 'spotify-web-api-js';

export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async handleSubmit() {

            const spotifyApi = new SpotifyWebApi();

            const data = await spotifyApi.clientCredentialsGrant();

            const accessToken = data.body['access_token'];

            spotifyApi.setAccessToken(accessToken);

            const response = await spotifyApi.searchTracks(this.email);

            console.log(response);
        },
    },
};
</script>  