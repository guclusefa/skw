<template>
    <RouterLink class="nav-item nav-link" :to="{ name: 'login' }" active-class="button-active">
        {{ $t('routes.login') }}
    </RouterLink>
</template>

<script>
export default {
    name: "AuthItem",
};
</script>

<style scoped lang="scss">
.nav-item {
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
</style>