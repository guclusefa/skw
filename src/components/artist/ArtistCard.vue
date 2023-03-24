<template>
    <div class="card">
        <img :src="artist.images[0].url" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">{{ artist.name }}</h5>
            <p class="card-text">Genres: {{ artist.genres.join(", ") }}</p>
            <p class="card-text">Followers: {{ artist.followers.total }}</p>
            <div class="d-flex gap-2">
                <a :href="artist.external_urls.spotify" class="btn btn-primary" target="_blank">Go to Spotify</a>
                <a :href="artist.uri" class="btn btn-outline-primary" target="_blank">Go to Spotify URI</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ArtistCard",
    props: {
        artist: {
            type: Object,
            required: true
        }
    }
};
</script>