<template>
    <section class="container">
        <h1>{{ user.display_name }}</h1>
        <UserItem :user="user" />
    </section>

</template>

<script>
import { useAuthStore } from '../../stores/auth';
import UserItem from '../../components/user/UserItem.vue';

export default {
    name: "MeView",
    data() {
        return {
            auth: useAuthStore()
        }
    },
    computed: {
        user() {
            return this.auth.user
        }
    },
    components: {
        UserItem
    },
};
</script>
