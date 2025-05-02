import i18n from 'sveltekit-i18n';
import config from './config.js';

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);