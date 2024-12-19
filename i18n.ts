import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { getLocale, saveLocale } from './storage';
import axios from 'axios';

const BASE_URL = 'https://storage.googleapis.com/jiffybook_public_files';

/**
 * Fetch translation data for a given language
 * @param {string} lng - Language code
 * @returns {Promise<any>} - Translation data
 */
const fetchTranslation = async (lng: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/${lng}.json`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch translations for language: ${lng}`, error);
    throw error; // Let the caller handle the error
  }
};

/**
 * Initialize i18n
 * Detects locale, fetches translations, and initializes i18n
 */
export const initI18n = async (): Promise<void> => {
  try {
    const detectedLocale = RNLocalize.getLocales()[0]?.languageCode || 'en';
    const savedLocale = getLocale() || detectedLocale;
    const locale = savedLocale;

    const initialTranslations = await fetchTranslation(locale);
    const resources: Resource = { [locale]: { translation: initialTranslations } };

    await i18n.use(initReactI18next).init({
      resources,
      lng: locale,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });

    saveLocale(locale); // Save the detected or selected locale
    console.log(`i18n initialized with locale: ${locale}`);
  } catch (error) {
    console.error('i18n initialization failed:', error);
  }
};

/**
 * Dynamically change language
 * Fetches new translations and updates the current language
 * @param {string} lng - New language code
 */
export const changeLanguage = async (lng: string): Promise<void> => {
  try {
    const newTranslations = await fetchTranslation(lng);
    i18n.addResourceBundle(lng, 'translation', newTranslations, true, true);
    await i18n.changeLanguage(lng); // Update the current language
    saveLocale(lng); // Persist the new language
    console.log(`Language changed to: ${lng}`);
  } catch (error) {
    console.error('Failed to change language:', error);
  }
};

export default i18n;
