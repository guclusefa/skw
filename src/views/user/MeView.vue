<template>
    <section class="container">
        <h1>{{ user.display_name }}</h1>
        <div class="row">
            <div class="col-lg-4 col-md-12">
                <UserItem :user="user" />
            </div>
            <div class="col-lg-8 col-md-12 mt-4 mt-lg-0">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#toptracks-tab-pane" aria-current="page">
                            Top Tracks
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#topartists-tab-pane">
                            Top Artists
                        </button>
                    </li>
                </ul>
                <div class="tab-content mt-2" id="myTabContent">
                    <div class="tab-pane show active" id="toptracks-tab-pane">
                        <!-- {{ topTracks }} -->
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-sm-12" v-for="track in topTracks" :key="track.id">
                                <TrackCard :track="track" />
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="topartists-tab-pane">
                        <!-- {{ topArtists }} -->
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-sm-12" v-for="artist in topArtists" :key="artist.id">
                                <ArtistCard :artist="artist" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useAuthStore } from '../../stores/auth';
import { useUserStore } from '../../stores/user';

import UserItem from '../../components/user/UserItem.vue';
import TrackCard from '../../components/track/TrackCard.vue';
import ArtistCard from '../../components/artist/ArtistCard.vue';

export default {
    name: "MeView",
    data() {
        return {
            authStore: useAuthStore(),
            userStore: useUserStore(),
        }
    },
    computed: {
        user() {
            return this.authStore.user
        },
        topTracks() {
            return this.userStore.topTracks
        },
        topArtists() {
            return this.userStore.topArtists
        }
    },
    mounted() {
        this.userStore.getTopTracks();
        this.userStore.getTopArtists();
    },
    components: {
        UserItem,
        TrackCard,
        ArtistCard,
    },
};
</script>
