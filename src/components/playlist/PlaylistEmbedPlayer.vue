<template>
    <iframe title="Spotify Embed: Recommendation Playlist " :src="`https://open.spotify.com/embed/playlist/${playlist.id}`"
        width="100%" height="380" frameborder="0" style="margin-top: 20px; border: 0; border-radius: 1rem;"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
</template>

<script>
export default {
    name: "PlaylistEmbedPlayer",
    props: {
        playlist: {
            type: Object,
            required: true
        },
    },
};
</script>