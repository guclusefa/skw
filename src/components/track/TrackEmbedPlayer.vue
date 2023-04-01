<template>
    <iframe :src="`https://open.spotify.com/embed/track/${track.id}`" />
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