<template>
    <section class="container">
        <h1>{{ $t("login.title") }}</h1>

        <LoginForm />
    </section>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm.vue";

export default {
    name: "LoginView",
    components: {
        LoginForm
    }
};
</script>