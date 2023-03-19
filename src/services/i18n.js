import { createI18n } from 'vue-i18n'

function loadLocaleMessages() {
    const messages = {}
    const locales = import.meta.globEager('@/locales/*.json')
    for (const path in locales) {
        const matched = path.match(/([A-Za-z0-9-_]+)\.json$/)
        if (matched && matched.length > 1) {
            const key = matched[1]
            messages[key] = locales[path]
        }
    }
    return messages
}

export default createI18n({
    locale: import.meta.env.VITE_I18N_LOCALE || 'en',
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages()
})