<template>
    <div v-if="lyricsCard">
        <TrackLyricsCard :lyricsCard="lyricsCard" />
    </div>
    <div class="card" id="lyrics-container" v-if="lyrics">
        <div class="card-body" id="lyrics-body">
            <p class="card-text" v-for="line in lyrics.lines" :key="line.startTimeMs" :id="line.startTimeMs"
                @click="handleOnLyricsClick(line.startTimeMs)">
                {{ line.words }}
            </p>
        </div>
    </div>
</template>
  
<script>
import { useTrackStore } from '../../stores/track';

import TrackLyricsCard from "./TrackLyricsCard.vue";

export default {
    name: "TrackLyrics",
    props: {
        track: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            trackStore: useTrackStore(),

            lyricsCard: null,
            selectedLines: []
        };
    },
    computed: {
        lyrics() {
            return this.trackStore.trackLyrics
        }
    },
    methods: {
        highlightLyrics(track) {
            // Highlight lyrics based on track progress
            const progressMs = track.progress_ms;
            const elements = document
                .getElementById("lyrics-body")
                .getElementsByClassName("card-text");
            // Loop through lyrics and add text-primary class if id is less than progressMs
            for (let i = 0; i < elements.length; i++) {
                const id = elements[i].id;
                if (id < progressMs) {
                    elements[i].classList.add("text-primary");
                } else {
                    elements[i].classList.remove("text-primary");
                }
            }
        },
        handleOnLyricsClick(id) {
            // Toggle bg-dark and text-primary classes
            const element = document.getElementById(id);
            element.classList.toggle("bg-dark");
            // Toggle selectedLines array
            this.selectedLines = this.selectedLines.includes(id)
                ? this.selectedLines.filter((line) => line !== id)
                : [...this.selectedLines, id];
            // If no lines are selected, set lyricsCard to null
            if (this.selectedLines.length === 0) {
                this.lyricsCard = null;
                return;
            }
            // Sort selected lines
            this.selectedLines.sort((a, b) => a - b);
            // Generate lyricsCard
            this.generateLyricsCard();
        },
        generateLyricsCard() {
            // Create lyricsCard object
            const trackLyrics = [];
            const trackName = this.track.item.name;
            const trackArtistName = this.track.item.artists[0].name;
            const trackImage = this.track.item.album.images[0].url;
            this.selectedLines.forEach((line) => {
                const element = document.getElementById(line);
                trackLyrics.push(element.innerText);
            });
            // Only create lyricsCard if there are selected lines
            if (this.selectedLines.length > 0) {
                this.lyricsCard = {
                    trackLyrics,
                    trackName,
                    trackArtistName,
                    trackImage
                };
            }
        }
    },
    mounted() {
        // Get lyrics for track
        this.trackStore.getLyrics(this.track.item.id);
    },
    created() {
        // Highlight lyrics every second
        setInterval(() => {
            if (this.track && this.track.progress_ms && this.lyrics) {
                this.highlightLyrics(this.track);
            }
        }, 1000);
    },
    watch: {
        // Watch for changes in track id
        "track.item.id": function (newVal) {
            // Get lyrics for new track
            this.trackStore.getLyrics(newVal);
            // Reset selected lines and lyricsCard
            this.selectedLines = [];
            this.lyricsCard = null;
        }
    },
    components: {
        TrackLyricsCard
    }
};
</script>

<style scoped lang="scss">
.card-text {
    font-size: 1.2rem;

    &:hover {
        cursor: pointer;
        color: $primary;
    }
}
</style>