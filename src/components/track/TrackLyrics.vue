<template>
    <div class="row" v-if="lyrics">
        <div class="col-xl-7">
            <div class="card" id="lyrics-container">
                <div class="card-body" id="lyrics-body">
                    <p class="card-text" v-for="line in lyrics.lines" :key="line.startTimeMs" :id="line.startTimeMs"
                        @click="handleOnLyricsClick(line.startTimeMs)">
                        {{ line.words }}
                    </p>
                </div>
            </div>
            <div class="d-flex justify-content-between gap-2 mt-2">
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-danger" @click="clearLyricsCard()">
                        <i class="bi bi-x fs-5"></i>
                    </button>
                    <button class="btn" @click="fixLyrics = !fixLyrics"
                        :class="fixLyrics ? 'btn-primary' : 'btn-outline-primary'">
                        <i class="bi bi-arrow-down-up fs-5"></i>
                    </button>
                </div>
                <div class="d-flex gap-2 flex-grow-1 justify-content-end">
                    <input type="text" class="form-control" placeholder="Search lyrics..." v-model="searchLyrics" />
                </div>
            </div>
        </div>
        <div class="col-xl-5 mt-3 mt-xl-0">
            <div v-if="lyricsCard">
                <TrackLyricsCard :lyricsCard="lyricsCard" />
            </div>
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
            selectedLines: [],
            fixLyrics: false,
            searchLyrics: ""
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
            // get all elements where id is less than progressMs
            const elementsToHighlight = Array.from(elements).filter(
                (element) => element.id <= progressMs
            );
            // add highlight to elementsToHighlight
            elementsToHighlight.forEach((element) => {
                element.classList.add("highlighted");
                if (!this.fixLyrics) {
                    // if fixLyrics, scroll to first element
                    const container = document.getElementById("lyrics-container");
                    container.scrollTop = element.offsetTop;
                    // scrool behavior is smooth
                    container.style.scrollBehavior = "smooth";
                }
            });
        },
        handleOnLyricsClick(id) {
            // Toggle highlight on lyrics line
            const element = document.getElementById(id);
            element.classList.toggle("selected");
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
        },
        clearLyricsCard() {
            // Clear lyricsCard
            this.lyricsCard = null;
            this.selectedLines = [];
            // remove selected from all elements
            const elements = document
                .getElementById("lyrics-body")
                .getElementsByClassName("card-text");
            if (elements) {
                Array.from(elements).forEach((element) => {
                    element.classList.remove("selected");
                });
            }
        },
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
            // Reset selected lines and lyricsCard
            this.clearLyricsCard();
            // Get lyrics for new track
            this.trackStore.getLyrics(newVal);
        }
    },
    components: {
        TrackLyricsCard
    }
};
</script>

<style scoped lang="scss">
.card {
    height: 350px;
    overflow-y: scroll;
}

.card-text {
    font-size: 1.2rem;

    &:hover {
        cursor: pointer;
        color: $primary;
    }

    &.highlighted {
        color: darken($primary, 20%);
    }

    &.selected {
        color: $primary;
        background-color: #00000020;
        border-radius: 5px;
    }
}
</style>