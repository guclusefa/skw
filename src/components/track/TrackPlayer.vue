<template>
    <div class="card">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="currentTrack.item.album.images[0].url" class="img-fluid object-fit-cover h-100 rounded-start"
                    v-if="currentTrack.item.album.images.length > 0">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <div class="d-flex align-items-center gap-2">
                        <h5 class="card-title" v-if="currentTrack.item.name">
                            {{ currentTrack.item.name }}
                        </h5>
                        <span class="badge bg-dark" v-if="currentTrack.explicit">
                            Explicit
                        </span>
                    </div>
                    <p class="card-text" v-if="currentTrack.item.album.artists.length > 0">
                        Artist: {{ currentTrack.item.album.artists[0].name }}
                    </p>
                    <p class="card-text" v-if="currentTrack.item.album.name">
                        Album: {{ currentTrack.item.album.name }}
                    </p>
                    <p class="card-text" v-if="currentTrack.item.album.release_date">
                        Release Date: {{ currentTrack.item.album.release_date }}
                    </p>
                </div>
                <div class="card-footer">
                    <div class="d-flex flex-column gap-3">
                        <div class="d-flex align-items-center gap-2">
                            <div>
                                <button class="btn btn-outline-primary">
                                    <i class="bi bi-skip-backward-fill"></i>
                                </button>
                            </div>
                            <div>
                                <button class="btn btn-primary" v-if="currentTrack.is_playing">
                                    <i class="bi bi-pause-fill"></i>
                                </button>
                                <button class="btn btn-outline-primary" v-else>
                                    <i class="bi bi-play-fill"></i>
                                </button>
                            </div>
                            <div>
                                <button class="btn btn-outline-primary">
                                    <i class="bi bi-skip-forward-fill"></i>
                                </button>
                            </div>
                            <div>
                                <button class="btn btn-outline-primary">
                                    <i class="bi bi-shuffle"></i>
                                </button>
                            </div>
                            <div>
                                <button class="btn btn-outline-primary">
                                    <i class="bi bi-repeat"></i>
                                </button>
                            </div>
                            <div class="d-flex gap-2 ms-auto">
                                <button class="btn btn-outline-primary" v-if="currentTrack.item.is_local">
                                    <i class="bi bi-heart"></i>
                                </button>
                                <button class="btn btn-outline-primary" v-else>
                                    <i class="bi bi-heart-fill"></i>
                                </button>
                                <button class="btn btn-outline-primary">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between align-items-center gap-2">
                            <div>
                                {{ formatDuration(currentTrack.progress_ms) }}
                            </div>
                            <div class="d-block w-100">
                                <div class="progress">
                                    <div class="progress-bar"
                                        :style="{ width: currentTrack.progress_ms / currentTrack.item.duration_ms * 100 + '%' }">
                                    </div>
                                </div>
                            </div>
                            <div>
                                {{ formatDuration(currentTrack.item.duration_ms) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TrackPlayer",
    props: {
        currentTrack: {
            type: Object,
            required: true
        },
    },
    methods: {
        formatDuration(duration_ms) {
            const minutes = Math.floor(duration_ms / 60000);
            const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
            return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
        },
    },
};
</script>