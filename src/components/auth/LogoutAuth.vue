<template>
    <div></div>
</template>

<script>
import { useAuthStore } from '../../stores/auth'

export default {
    name: 'LogoutAuth',
    data() {
        return {
            authStore: useAuthStore()
        }
    },
    methods: {
        logout() {
            // logout
            this.authStore.logout()
            // toast
            this.$toast.success('You have been logged out')
            // redirect to home
            this.$router.push({ name: 'home' })
        }
    },
    mounted() {
        this.logout()
    }
}
</script>