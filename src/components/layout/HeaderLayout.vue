<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <ThemeSwitcher />
      <LocaleSwitcher />
    </nav>
  </header>
</template>

<script>
import ThemeSwitcher from '../fragments/ThemeSwitcher.vue';
import LocaleSwitcher from '../fragments/LocaleSwitcher.vue';

export default {
  name: 'HeaderLayout',
  components: {
    ThemeSwitcher,
    LocaleSwitcher,
  },
};
</script>