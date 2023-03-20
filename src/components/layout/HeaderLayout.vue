<template>
  <header class="header mb-3 fs-5 shadow">
    <nav class="navbar navbar-expand-lg px-0 py-2">
      <div class="container">
        <!-- Brand -->
        <RouterLink class="navbar-brand d-flex align-items-center" :to="{ name: 'home' }" active-class="nav-active">
          <img src="@/assets/images/logo.svg">
          {{ $t('app.title') }}
        </RouterLink>
        <!-- Navbar toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <i class="bi bi-list-task"></i>
        </button>
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <!-- Nav left -->
          <div class="navbar-nav gap-2">
            <RouterLink class="nav-item nav-link" :to="{ name: 'home' }" active-class="nav-active">
              {{ $t('routes.home') }}
            </RouterLink>
            <RouterLink class="nav-item nav-link" :to="{ name: 'about' }" active-class="nav-active">
              {{ $t('routes.about') }}
            </RouterLink>
          </div>
          <!-- Nav middle -->
          <div class="navbar-nav mx-lg-auto gap-2">
            <SearchField />
          </div>
          <!-- Nav right -->
          <div class="d-flex align-items-lg-center mt-3 mt-lg-0">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0  gap-2">
              <ThemeSwitcher />
              <LocaleSwitcher />
              <AuthItem />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import SearchField from '../fragments/SearchField.vue';
import ThemeSwitcher from '../fragments/ThemeSwitcher.vue';
import LocaleSwitcher from '../fragments/LocaleSwitcher.vue';
import AuthItem from './AuthItem.vue';

export default {
  name: 'HeaderLayout',
  components: {
    SearchField,
    ThemeSwitcher,
    LocaleSwitcher,
    AuthItem,
  },
};
</script>

<style scoped lang="scss">
.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;

  img {
    height: 2.4rem;
    width: auto;
    margin-right: 0.5rem;
  }
}

.navbar-toggler {
  border: none;
  background-color: transparent;
  color: $primary;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &[aria-expanded="true"] {
    i:before {
     content: "\f659";
    }
  }
}


.nav-active {
  font-weight: 700;
  color: $primary !important;

  &:focus,
  &:hover {
    color: $primary;
  }
}
</style>