<template>
    <div class="lyrics-card">
        <div class="lyrics-header">
            <img :src="lyricsCard.trackImage" alt="Track Image" />
            <div class="lyrics-header-info">
                <h2>{{ lyricsCard.trackName }}</h2>
                <h3>{{ lyricsCard.trackArtistName }}</h3>
            </div>
        </div>
        <div class="lyrics-body">
            <div class="lyrics-text">
                <p v-for="(lyric, index) in lyricsCard.trackLyrics" :key="index">
                    {{ lyric }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "TrackLyricsCard",
    props: {
        lyricsCard: {
            type: Object,
            required: true,
        },
    },
};
</script>
<style>
.lyrics-card {
    background-color: black;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.lyrics-header {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #f2f2f2;
}

.lyrics-header img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
}

.lyrics-header-info h2 {
    margin: 0 0 5px;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.2;
}

.lyrics-header-info h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.2;
    color: #999;
}

.lyrics-body {
    padding: 20px;
}

.lyrics-text p {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.4;
}
</style>