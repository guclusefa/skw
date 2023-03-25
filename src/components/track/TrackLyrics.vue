<template>
    <div v-if="lyricsCard !== null">
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
        },
    },
    data() {
        return {
            selectedLines: [],
            lyricsCard: null
        }
    },
    methods: {
        hoverLyrics(currentTrack) {
            const progressMs = currentTrack.progress_ms;
            // get all element of "card-text" inside the "lyrics" div parent for example <p class="card-text" id="1234">...</p>
            const elements = document.getElementById("lyrics-body").getElementsByClassName("card-text");
            // loop through all elements
            for (let i = 0; i < elements.length; i++) {
                // get the id of the element
                const id = elements[i].id;
                // if the id is smaller than the current progressMs
                if (id < progressMs) {
                    // add the class "text-primary" to the element
                    elements[i].classList.add("text-primary");
                } else {
                    // remove the class "text-primary" from the element
                    elements[i].classList.remove("text-primary");
                }
            }
        },
        handleOnLyricsClick(id) {
            const element = document.getElementById(id);
            // add bg-dark class to the element to highlight it or remove it if it already has it
            element.classList.toggle("bg-dark");
            // add to the selectedLines array the id of the element or remove it if it already has it
            this.selectedLines = this.selectedLines?.includes(id) ? this.selectedLines.filter(line => line !== id) : [...this.selectedLines, id];

            //////
            if (this.selectedLines.length === 0) {
                this.lyricsCard = null;
                return;
            }
            // order the selectedLines array by id
            this.selectedLines.sort((a, b) => a - b);
            const trackLyrics = [];
            const trackName = this.currentTrack.item.name;
            const trackArtistName = this.currentTrack.item.artists[0].name;
            const trackImage = this.currentTrack.item.album.images[0].url;
            // for each selected line get the element and get the text
            this.selectedLines.forEach(line => {
                const element = document.getElementById(line);
                trackLyrics.push(element.innerText);
            });
            const lyricsCard = {
                trackLyrics,
                trackName,
                trackArtistName,
                trackImage
            };
            this.lyricsCard = lyricsCard;
        },
    },
    mounted() {
        // every 100ms check if the currentTrack has changed
        setInterval(() => {
            if (this.currentTrack && this.currentTrack.progress_ms) {
                this.hoverLyrics(this.currentTrack);
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