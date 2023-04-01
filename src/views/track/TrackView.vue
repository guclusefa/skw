<template>
    <section class="container" v-if="trackStore.track">
        <h1>{{ trackStore.track.name }} by {{ trackStore.track.artists[0].name }}</h1>
        <div class="row">
            <div class="col-12">
                <TrackCard :track="trackStore.track" />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <TrackLyrics :track="trackStore.track" />
            </div>
        </div>
    </section>
</template>

<script>
import { useTrackStore } from '../../stores/track';

import TrackCard from '../../components/track/TrackCard.vue';
import TrackLyrics from '../../components/track/TrackLyrics.vue';

export default {
    name: "TrackView",
    data() {
        return {
            trackStore: useTrackStore(),
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    methods: {
        async getTrack() {
            await this.trackStore.getTrack(this.id);
        },
    },
    created() {
        this.getTrack().then(() => {
            // If track is not found, redirect to home
            if (!this.trackStore.track) {
                this.$toast.error('Track not found');
                this.$router.push({ name: 'home' });
            }
        });
    },
    components: {
        TrackCard,
        TrackLyrics,
    },
};
</script>