<template>
    <div v-if="lyricsCard">
        <TrackLyricsCard :lyricsCard="lyricsCard" />
    </div>
    <div class="card" id="lyrics-container">
        <div class="card-body" id="lyrics-body">
            <p class="card-text" v-for="line in lyrics.lines" :key="line.startTimeMs" :id="line.startTimeMs"
                @click="handleOnLyricsClick(line.startTimeMs)">
                {{ line.words }}
            </p>
        </div>
    </div>
</template>
  
<script>
import TrackLyricsCard from "./TrackLyricsCard.vue";

export default {
    name: "TrackLyrics",
    props: {
        lyrics: {
            type: Object,
            required: true
        },
        currentTrack: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            selectedLines: [],
            lyricsCard: null
        };
    },
    methods: {
        highlightLyrics(currentTrack) {
            const progressMs = currentTrack.progress_ms;
            const elements = document
                .getElementById("lyrics-body")
                .getElementsByClassName("card-text");
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
            const element = document.getElementById(id);
            element.classList.toggle("bg-dark");
            this.selectedLines = this.selectedLines.includes(id)
                ? this.selectedLines.filter((line) => line !== id)
                : [...this.selectedLines, id];

            if (this.selectedLines.length === 0) {
                this.lyricsCard = null;
                return;
            }

            this.selectedLines.sort((a, b) => a - b);

            this.generateLyricsCard();
        },
        generateLyricsCard() {
            const trackLyrics = [];
            const trackName = this.currentTrack.item.name;
            const trackArtistName = this.currentTrack.item.artists[0].name;
            const trackImage = this.currentTrack.item.album.images[0].url;

            this.selectedLines.forEach((line) => {
                const element = document.getElementById(line);
                trackLyrics.push(element.innerText);
            });

            const lyricsCard = {
                trackLyrics,
                trackName,
                trackArtistName,
                trackImage
            };

            // Only create lyricsCard if there are selected lines
            if (this.selectedLines.length > 0) {
                this.lyricsCard = lyricsCard;
            }
        }
    },
    mounted() {
        setInterval(() => {
            if (this.currentTrack && this.currentTrack.progress_ms) {
                this.highlightLyrics(this.currentTrack);
            }
        }, 1000);
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