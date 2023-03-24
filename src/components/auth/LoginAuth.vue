<template>
    <div></div>
</template>
  
<script>
export default {
    name: 'LoginAuth',
    methods: {
        requestAuth() {
            // url
            let url = "https://accounts.spotify.com/authorize";
            // scopes
            const scopes = [
                "user-read-private",
                "user-read-email",
                "user-modify-playback-state",
                "user-read-playback-position",
                "user-library-read",
                "streaming",
                "user-read-playback-state",
                "user-read-recently-played",
                "playlist-read-private",
                "user-top-read",
            ];
            // params
            url += '?client_id=' + import.meta.env.VITE_API_SPOTIFY_CLIENT_ID
            url += '&response_type=code';
            url += '&redirect_uri=' + import.meta.env.VITE_API_SPOTIFY_REDIRECT_URI;
            url += '&show_dialog=true';
            url += '&scope=' + encodeURIComponent(scopes.join(' '));
            // open url
            window.location.href = url;
        }
    },
    mounted() {
        this.requestAuth();
    }
}
</script>