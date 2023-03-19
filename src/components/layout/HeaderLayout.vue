<template>
  <header class="header mb-3 fs-5 shadow">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-2">
      <div class="container">
        <!-- Brand -->
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="@/assets/images/logo.svg">
          {{ $t('app.title') }}
        </a>
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
          </div>
          <!-- Nav middle -->
          <div class="navbar-nav mx-lg-auto gap-2">
            <RouterLink class="nav-item nav-link" :to="{ name: 'about' }" active-class="nav-active">
              {{ $t('routes.about') }}
            </RouterLink>
          </div>
          <!-- Nav right -->
          <div class="d-flex align-items-lg-center mt-3 mt-lg-0">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0  gap-2">
              <ThemeSwitcher />
              <LocaleSwitcher />
            </ul>
          </div>
        </div>
      </div>
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

<style scoped lang="scss">
.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;

  img {
    height: 2rem;
    width: auto;
    margin-right: 0.5rem;
  }
}

.navbar-toggler {
  border: none;
  background-color: transparent;
  color: #fff;
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
  color: #fff;

  &:focus,
  &:hover {
    color: #fff;
  }
}
</style>