import { MMKV } from 'react-native-mmkv';

// Initialize MMKV
export const storage = new MMKV();

// Function to save locale
export const saveLocale = (locale: string): void => {
  storage.set('locale', locale);
};

// Function to get locale
export const getLocale = (): string => {
  return storage.getString('locale') || 'en'; // Default to 'en'
};
