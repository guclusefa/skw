<template>
    <div class="card" style="width: 18rem;">
        <img :src="user.images[0].url" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">{{ user.display_name }}</h5>
            <p class="card-text">Country: {{ user.country }}</p>
            <p class="card-text">Email: {{ user.email }}</p>
            <p class="card-text">Product: {{ user.product }}</p>
            <p class="card-text">Followers: {{ user.followers.total }}</p>
            <a :href="user.external_urls.spotify" class="btn btn-primary" target="_blank">Go to Spotify</a>
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