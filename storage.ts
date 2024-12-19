import { MMKV } from 'react-native-mmkv';

// Initialize MMKV
export const storage = new MMKV();

/**
 * Save the locale to persistent storage
 * @param {string} locale - Language code to save
 */
export const saveLocale = (locale: string): void => {
  try {
    storage.set('locale', locale);
    console.log(`Locale saved: ${locale}`);
  } catch (error) {
    console.error('Failed to save locale:', error);
  }
};

/**
 * Get the saved locale from persistent storage
 * @returns {string} - Saved language code or default 'en'
 */
export const getLocale = (): string => {
  try {
    return storage.getString('locale') || 'en'; // Default to 'en' if no locale is saved
  } catch (error) {
    console.error('Failed to get locale:', error);
    return 'en';
  }
};

