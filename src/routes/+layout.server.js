import { redirect } from '@sveltejs/kit';

export const load = async ({ url, request }) => {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const supportedLocales = ['en', 'es'];
  const defaultLocale = 'en';

  // Detect user's preferred language
  const detectedLocale = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim())
    .find(lang => supportedLocales.includes(lang)) || defaultLocale;

  // Check if already on the correct locale route
  const currentLocale = url.pathname.split('/')[1];
  if (url.pathname === "/" || !supportedLocales.includes(currentLocale)) {
    redirect(302, `/${detectedLocale}`);
  } 
  
  // Load translations for the detected locale
  return { locale: detectedLocale };
};
