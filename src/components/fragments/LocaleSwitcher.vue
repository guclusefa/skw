<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
            <i class="bi bi-translate"></i> {{ labelsShort[selectedLocale] }}
        </a>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" v-for="locale in locales" :key="locale"
                    @click="selectedLocale = locale">{{ labels[locale] }}</a></li>
        </ul>
    </li>
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
            labelsShort: {
                en: "EN",
                fr: "FR",
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