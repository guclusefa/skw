<template>
    <div class="ratio ratio-16x9">
        <iframe 
            :src="`https://open.spotify.com/embed/track/${track.id}`"
            allow="encrypted-media"
            allowfullscreen
            loading="lazy"
            class="embed-responsive-item"
            style="width: 100%; height: 380px; border: 0; overflow: hidden; border-radius: 0.25rem;"
        />
    </div>
</template>

<script>
export default {
    name: "TrackEmbedPlayer",
    props: {
        track: {
            type: Object,
            required: true
        },
    },
};
</script>