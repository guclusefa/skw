<template>
    <div>
        <h1>test callbackc</h1>
    </div>
</template>

<script>
import { useAuthStore } from '../../stores/auth'

export default {
    name: 'LogoutAuth',
    data() {
        return {
            auth: useAuthStore()
        }
    },
    methods: {
        logout() {
            this.auth.logout()
            // redirect to home
            this.$router.push({ name: 'home' })
        }
    },
    mounted() {
        this.logout()
    }
}
</script>