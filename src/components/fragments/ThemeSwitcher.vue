<template>
    <li class="nav-item">
        <a class="nav-link" href="#" role="button" @click="toggleDark(); toggleTransition()">
            <i class="bi bi-moon-fill" v-if="isDark"></i>
            <i class="bi bi-brightness-high-fill" v-else></i>
        </a>
    </li>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const toggleTransition = () => {
    const body = document.querySelector("body");
    body.style.transition = "background 0.5s ease";
    setTimeout(() => {
        body.style.transition = "";
    }, 500);
}
</script>