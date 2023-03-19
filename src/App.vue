<template>
  <HeaderLayout />
  <main>
    <RouterView />
  </main>
  <FooterLayout />
</template>

<script>
import { RouterView } from 'vue-router'

import HeaderLayout from './components/layout/HeaderLayout.vue'
import FooterLayout from './components/layout/FooterLayout.vue'

export default {
  name: 'App',
  components: {
    HeaderLayout,
    RouterView,
    FooterLayout
  }
}
</script>
