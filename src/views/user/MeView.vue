<template>
    <section class="container">
        <h1>{{ user.display_name }}</h1>
        <div class="row">
            <!-- User -->
            <div class="col-lg-4 col-md-12">
                <!-- User Item -->
                <UserItem :user="user" />
            </div>
            <!-- Tabs -->
            <div class="col-lg-8 col-md-12 mt-4 mt-lg-0">
                <!-- Tabs Nav -->
                <ul class="nav nav-tabs">
                    <!-- Currently Playing -->
                    <li class="nav-item">
                        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#currentlyplaying-tab-pane">
                            Currently Playing
                        </button>
                    </li>
                    <!-- Top Tracks -->
                    <li class="nav-item">
                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#toptracks-tab-pane">
                            Top Tracks
                        </button>
                    </li>
                    <!-- Top Artists -->
                    <li class="nav-item">
                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#topartists-tab-pane">
                            Top Artists
                        </button>
                    </li>
                    <!-- Playlists -->
                    <li class="nav-item">
                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#playlists-tab-pane">
                            Playlists
                        </button>
                    </li>
                </ul>
                <!-- Tabs Content -->
                <div class="tab-content mt-2" id="myTabContent">
                    <!-- Currently Playing -->
                    <div class="tab-pane show active" id="currentlyplaying-tab-pane">
                        <div class="row row-cols-1 g-4">
                            <div class="col">
                                <div class="d-flex flex-column gap-3" v-if="currentlyPlaying && currentlyPlaying.item">
                                    <TrackPlayer :track="currentlyPlaying" />
                                    <TrackLyrics :track="currentlyPlaying" />
                                </div>
                                <div v-else>
                                    <h5>No song is currently playing</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Top Tracks -->
                    <div class="tab-pane" id="toptracks-tab-pane">
                        <div class="row row-cols-1 g-4">
                            <div class="col" v-for="track in topTracks" :key="track.id">
                                <TrackCard :track="track" />
                            </div>
                        </div>
                    </div>
                    <!-- Top Artists -->
                    <div class="tab-pane" id="topartists-tab-pane">
                        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4">
                            <div class="col" v-for="artist in topArtists" :key="artist.id">
                                <ArtistCard :artist="artist" />
                            </div>
                        </div>
                    </div>
                    <!-- Playlists -->
                    <div class="tab-pane" id="playlists-tab-pane">
                        <div class="row row-cols-1 g-4">
                            <div class="col" v-for="playlist in playlists" :key="playlist.id">
                                <PlaylistCard :playlist="playlist" />
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
import TrackPlayer from '../../components/track/TrackPlayer.vue';
import TrackLyrics from '../../components/track/TrackLyrics.vue';
import TrackCard from '../../components/track/TrackCard.vue';
import ArtistCard from '../../components/artist/ArtistCard.vue';
import PlaylistCard from '../../components/playlist/PlaylistCard.vue';

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
        currentlyPlaying() {
            return this.userStore.currentlyPlaying
        },
        topTracks() {
            return this.userStore.topTracks
        },
        topArtists() {
            return this.userStore.topArtists
        },
        playlists() {
            return this.userStore.playlists
        },
    },
    mounted() {
        this.userStore.getCurrentlyPlaying();
        this.userStore.getTopTracks();
        this.userStore.getTopArtists();
        this.userStore.getPlaylists().then(() => {
            console.log(this.playlists);
        });
    },
    created() {
        setInterval(() => {
            this.userStore.getCurrentlyPlaying();
        }, 1000);
    },
    components: {
        UserItem,
        TrackPlayer,
        TrackLyrics,
        TrackCard,
        ArtistCard,
        PlaylistCard,
    },
};
</script>
