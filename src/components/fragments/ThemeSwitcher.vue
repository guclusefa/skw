<template>
    <button @click="toggleDark(); toggleTransition()">
        <span v-if="isDark">🌙</span>
        <span v-else>☀️</span>
    </button>
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