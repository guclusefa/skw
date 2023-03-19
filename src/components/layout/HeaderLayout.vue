<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <LocaleSwitcher />
    </nav>
  </header>
</template>

<script>
import LocaleSwitcher from '../fragments/LocaleSwitcher.vue';

export default {
  name: 'HeaderLayout',
  components: {
    LocaleSwitcher,
  },
};
</script>