import { LocaleEnum } from "./constant";
import { LocaleCode } from "./types";

/**
 * transform browser language to you given i18n locale codes
 * @param lang - browser language
 * @param localeCodes - locale codes to check
 * @param defaultLang - default locale code
 * @example
 * parseI18nLang('en-US') => 'en'
 * parseI18nLang('zh-CN') => 'zh'
 * parseI18nLang('zh-TW') => 'zh'
 * parseI18nLang('ja') => 'ja'
 * */
export function parseI18nLang(
  lang: string,
  localeCodes?: LocaleCode[],
  defaultLang?: LocaleCode
) {
  localeCodes = localeCodes || Object.values(LocaleEnum);
  defaultLang = defaultLang || LocaleEnum.en;

  const regex = /^([a-z]{2})/i;
  const match = lang?.match(regex);

  if (!match) return defaultLang;

  const matchLang = match[1];

  if (localeCodes.includes(lang)) {
    return lang;
  }

  if (localeCodes.includes(matchLang)) {
    return matchLang;
  }

  return defaultLang;
}

/**
 * remove lang prefix from pathname
 * @param pathname - pathname to remove lang prefix
 * @param localeCodes - locale codes to check
 * @example
 * removeLangPrefix('/en/perp/PERP_ETH_USDC') => '/perp/PERP_ETH_USDC'
 * removeLangPrefix('/en/markets') => '/markets'
 * removeLangPrefix('/perp/PERP_ETH_USDC') => '/perp/PERP_ETH_USDC'
 * removeLangPrefix('/markets') => '/markets'
 */
export function removeLangPrefix(pathname: string, localeCodes?: string[]) {
  const localePath = getLocalePathFromPathname(pathname, localeCodes);

  return localePath
    ? pathname.replace(new RegExp(`^/${localePath}(?=/)`), "")
    : pathname;
}

/**
 * get locale path from pathname
 * @param pathname - pathname to get locale path
 * @param localeCodes - locale codes to check
 * @example
 * getLocalePathFromPathname('/en/perp/PERP_ETH_USDC') => 'en'
 * getLocalePathFromPathname('/perp/PERP_ETH_USDC') => null
 * getLocalePathFromPathname('/en/markets') => 'en'
 * getLocalePathFromPathname('/markets') => null
 */
export function getLocalePathFromPathname(
  pathname: string,
  localeCodes?: string[]
) {
  const locale = pathname.split("/")[1];
  localeCodes = localeCodes || Object.values(LocaleEnum);
  return localeCodes.includes(locale as LocaleEnum) ? locale : null;
}

/**
 * Generate path with locale
 * @param lang - language
 * @param path - path to generate
 * @param localeCodes - locale codes to check
 * @returns path with locale
 */
export function generateLocalePath(
  lang: string,
  path: string,
  localeCodes?: string[]
) {
  localeCodes = localeCodes || Object.values(LocaleEnum);

  let localePath = getLocalePathFromPathname(path, localeCodes);

  // if path already has locale, return it
  if (localePath) {
    return path;
  }

  localePath = parseI18nLang(lang, localeCodes);

  // if path doesn't have locale, add it
  return `/${localePath}${path}`;
}
