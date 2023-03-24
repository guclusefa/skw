<template>
    <RouterLink class="nav-item nav-link btn-nav" :to="{ name: 'login' }" active-class="button-active"
        v-if="!isFullyLoggedIn">
        {{ $t('app.routes.login') }}
    </RouterLink>
    <li class="nav-item dropdown" v-else>
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
            {{ user.display_name }}
            <img :src="user.images[0].url" class="avatar" alt="Avatar" v-if="user.images.length > 0" />
        </a>
        <ul class="dropdown-menu">
            <li>
                <RouterLink class="dropdown-item" :to="{ name: 'me' }" active-class="button-active">
                    {{ $t('app.routes.me') }}
                </RouterLink>
            </li>
            <li>
                <RouterLink class="dropdown-item" :to="{ name: 'logout' }" active-class="button-active">
                    {{ $t('app.routes.logout') }}
                </RouterLink>
            </li>
        </ul>
    </li>
</template>

<script>
import { useAuthStore } from '../../stores/auth'

export default {
    name: "AuthItem",
    data() {
        return {
            authStore: useAuthStore()
        }
    },
    computed: {
        isFullyLoggedIn() {
            return this.authStore.isFullyLoggedIn
        },
        user() {
            return this.authStore.user
        }
    }
};
</script>

<style scoped lang="scss">
.btn-nav {
    background-color: $primary;
    color: black !important;
    border-radius: 0.5rem;
    text-align: center;
    padding: 0.5rem 2rem;
    min-width: 6rem;
    font-weight: 700;

    &:hover,
    &.button-active {
        color: white !important;
    }
}

.avatar {
    width: 2rem;
    height: 2rem;
    margin-left: 0.5rem;
    border-radius: 0.25rem;
    object-fit: cover;
}
</style>