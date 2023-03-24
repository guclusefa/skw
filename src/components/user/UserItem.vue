<template>
    <div class="card">
        <img :src="user.images[0].url" class="img-fluid object-fit-cover h-100">
        <div class="card-body">
            <h5 class="card-title">{{ user.display_name }}</h5>
            <p class="card-text">Country: {{ user.country }}</p>
            <p class="card-text">Email: {{ user.email }}</p>
            <p class="card-text">Product: {{ user.product }}</p>
            <p class="card-text">Followers: {{ user.followers.total }}</p>
            <div class="d-flex gap-2">
                <a :href="user.external_urls.spotify" class="btn btn-primary" target="_blank">Go to Spotify</a>
                <a :href="user.uri" class="btn btn-outline-primary" target="_blank">Go to Spotify URI</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserItem",
    props: {
        user: {
            type: Object,
            required: true
        }
    }
};
</script>