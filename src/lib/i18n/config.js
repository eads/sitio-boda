export default {
  fallbackLocale: 'en',
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('./locales/en/common.json')).default,
    },
    {
      locale: 'es',
      key: 'common',
      loader: async () => (await import('./locales/es/common.json')).default,
    },
  ],
};
