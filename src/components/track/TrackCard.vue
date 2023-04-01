<template>
    <div class="card">
        <div class="row g-0">
            <div class="col-4">
                <RouterLink :to="{ name: 'track', params: { id: track.id } }">
                    <img :src="track.album.images[0].url" class="img-fluid object-fit-cover h-100 rounded-start">
                </RouterLink>
            </div>
            <div class="col-8">
                <div class="card-body">
                    <div class="d-flex align-items-center gap-2">
                        <h5 class="card-title">
                            {{ track.name }}
                        </h5>
                        <span class="badge bg-dark" v-if="track.explicit">
                            Explicit
                        </span>
                    </div>
                    <p class="card-text">Artist: {{ track.album.artists[0].name }}</p>
                    <p class="card-text">Album: {{ track.album.name }}</p>
                    <p class="card-text">Release Date: {{ track.album.release_date }}</p>
                    <p class="card-text">Duration: {{ formatDuration(track.duration_ms) }}</p>
                    <div class="d-flex gap-2">
                        <a :href="track.external_urls.spotify" class="btn btn-primary" target="_blank">Go to Spotify</a>
                        <a :href="track.uri" class="btn btn-outline-primary" target="_blank">Go to Spotify URI</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TrackCard",
    props: {
        track: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatDuration(duration_ms) {
            const minutes = Math.floor(duration_ms / 60000);
            const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
            return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;

        }
    }
};
</script>