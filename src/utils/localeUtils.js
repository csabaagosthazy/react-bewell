export function getLocaleFromPath(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];

  // Default to 'hu' if no locale in path
  if (['en', 'de'].includes(locale)) return locale;
  return 'hu';
}

export function createPathName(locale, pathSegment) {
  return `/${locale}/${pathSegment}`;
}

export function getPathWithLocale(locale, location) {
  const parts = location.pathname.split('/');

  parts[1] = locale;

  return parts.join('/') || '/hu';
}

export const getInitialLocale = () => {
  const savedLang = localStorage.getItem('preferredLang');
  if (savedLang) return savedLang;

  const browserLang = navigator.language.slice(0, 2);
  const supportedLangs = ['hu', 'en', 'de'];
  if (supportedLangs.includes(browserLang)) {
    return browserLang;
  }
  return 'hu';
};
