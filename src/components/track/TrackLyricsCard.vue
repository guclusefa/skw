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
        <div class="lyrics-footer">
            <p class="d-flex align-items-center gap-2">
                <img src="@/assets/images/logo.svg" alt="Logo" />
                Created using SKW
            </p>
        </div>
    </div>
    <div class="d-flex justify-content-between mt-3">
        <div class="d-flex gap-2">
            <button class="btn btn-outline-primary" @click="downloadLyricsCard()">
                <i class="bi bi-download fs-5"></i>
            </button>
            <button class="btn btn-outline-primary" @click="shareLyricsCard('twitter')">
                <i class="bi bi-twitter fs-5"></i>
            </button>
        </div>
    </div>
</template>
<script>
import ColorThief from "colorthief";
import html2canvas from "html2canvas";

export default {
    name: "TrackLyricsCard",
    props: {
        lyricsCard: {
            type: Object,
            required: true,
        },
    },
    methods: {
        getDominantColor() {
            const img = new Image();
            img.src = this.lyricsCard.trackImage;
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const colorThief = new ColorThief();
                const color = colorThief.getColor(img);
                // set the background color of the lyrics card to the dominant color of the track image
                document.querySelector(".lyrics-card").style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                // set the color of the lyrics text to white or black depending on the dominant color and set to !important to override the bootstrap class
                document.querySelector(".lyrics-card").style.color = color[0] + color[1] + color[2] > 382 ? "#000" : "#fff";
/*                 // set border color to the lyrics header to white or black depending on the dominant color
                document.querySelector(".lyrics-header").style.borderBottomColor = color[0] + color[1] + color[2] > 382 ? "#000" : "#fff"; */
            };
        },
        shareLyricsCard(social) {
            // Remove all spaces and quotions (' and ") from the track artist name and track name
            const artistHashtag = this.lyricsCard.trackArtistName.replace(/[ '"’“”]/g, "").replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9]/g, "");
            const trackHashtag = this.lyricsCard.trackName.replace(/[ '"’“”]/g, "").replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9]/g, "");
            const text = `I just created a lyrics card using SKW for the track ${this.lyricsCard.trackName} by ${this.lyricsCard.trackArtistName}, check it out !`;
            /* const url = `skw.vercel.app/tracks/${this.lyricsCard.trackId}`; */
            const hashtags = `${artistHashtag},${trackHashtag},SKW`;

            // Declare the variable outside the switch statement
            let socialUrl;
            // Build the Twitter share URL
            switch (social) {
                case "twitter":
                    socialUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}`;
                    break;
                default:
                    break;
            }
            window.open(socialUrl, "_blank");
        },
        downloadLyricsCard() {
            // set the lyrics footer to display block to show the footer
            document.querySelector(".lyrics-footer").style.display = "block";
            const lyricsCardE = document.querySelector(".lyrics-card");
            const fileName = `${this.lyricsCard.trackName} - ${this.lyricsCard.trackArtistName}.png`;
            html2canvas(lyricsCardE, {
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                scale: 2,
            }).then(function (canvas) {
                const link = document.createElement("a");
                link.download = fileName;
                link.href = canvas.toDataURL();
                link.click();
            });
            // set the lyrics footer to display none to hide the footer
            document.querySelector(".lyrics-footer").style.display = "none";
        }
    },
    mounted() {
        this.getDominantColor();
    }
};
</script>

<style scoped lang="scss">
.lyrics-card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.lyrics-header {
    display: flex;
    align-items: center;
    padding: 20px 20px 0 20px;
/*     border-bottom: 1px solid;
    border-color: rgba(0, 0, 0, 0.125); */
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
}

.lyrics-body {
    padding: 10px 20px 20px 20px;
}

.lyrics-text p {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.4;
}

.lyrics-footer {
    display: none;
    padding: 0 20px 1px 20px;
    font-size: 12px;

    & img {
        width: 20px;
        height: 20px;
    }
}
</style>