<template>
    <div class="card">
        <div class="row g-0">
            <div class="col-4">
                <img :src="playlist.images[0].url" class="img-fluid object-fit-cover h-100 rounded-start"
                    v-if="playlist.images.length > 0">
            </div>
            <div class="col-8">
                <div class="card-body">
                    <div class="d-flex align-items-center gap-2">
                        <h5 class="card-title">
                            {{ playlist.name }}
                        </h5>
                        <span class="badge bg-dark">
                            {{ playlist.public ? "Public" : "Private" }}
                        </span>
                    </div>
                    <p class="card-text">{{ playlist.description }}</p>
                    <div class="d-flex gap-2">
                        <a :href="playlist.external_urls.spotify" class="btn btn-primary" target="_blank">Go to Spotify</a>
                        <a :href="playlist.uri" class="btn btn-outline-primary" target="_blank">Go to Spotify URI</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <iframe title="Spotify Embed: Recommendation Playlist " :src="`https://open.spotify.com/embed/playlist/${playlist.id}`"
        width="100%" height="380" frameborder="0" style="margin-top: 20px; border: 0; border-radius: 1rem;"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
</template>

<script>
export default {
    name: "PlaylistCard",
    props: {
        playlist: {
            type: Object,
            required: true
        }
    },
};
</script>