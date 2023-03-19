<template>
    <select v-model="selectedLocale">
        <option v-for="locale in locales" :key="locale" :value="locale">
            {{ labels[locale] }}
        </option>
    </select>
</template>

<script>


export default {
    name: "LocaleSwitcher",
    data() {
        return {
            locales: import.meta.env.VITE_I18N_LOCALES.split(","),
            labels: {
                en: "English",
                fr: "Français",
            },
            selectedLocale: localStorage.getItem("locale") || import.meta.env.VITE_I18N_LOCALE,
        };
    },
    watch: {
        selectedLocale() {
            localStorage.setItem("locale", this.selectedLocale);
            this.$i18n.locale = this.selectedLocale;
            document.querySelector("html").setAttribute("lang", this.selectedLocale);
        },
    },
    mounted() {
        this.$i18n.locale = this.selectedLocale;
        document.querySelector("html").setAttribute("lang", this.selectedLocale);
    },
};
</script>