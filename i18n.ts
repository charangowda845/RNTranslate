import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { getLocale, saveLocale } from './storage';
import axios from 'axios'
// Base URL for translations
const BASE_URL = 'https:/Actually url/en.json';

const fetchTranslation = async (lng: string): Promise<any> => {


  try {
    const response = await axios.get(`BASE_URL${lng}.json`);



    return response.data
  }
  catch (error){
console.log(error)
  }





    // fetch("https://storage.googleapis.com/jiffybook_public_files/en.json").then(async response => {
    //     try {
    //      const data = await response.json()
    //      console.log('response data?', data)
    //    } catch(error) {
    //      console.log('Error happened here!')
    //      console.error(error)
    //    }
    //   })



};

  
export const initI18n = async (): Promise<void> => {
  try {
    const detectedLocale = RNLocalize.getLocales()[0]?.languageCode;

    //console.log('response data?',  RNLocalize.getLocales()[0]?.languageCode)
   // const savedLocale = getLocale();
    const locale = detectedLocale;

    const initialTranslations = await fetchTranslation(locale);
    const resources: Resource = { [locale]: { translation: initialTranslations } };

    await i18n.use(initReactI18next).init({
      resources,
      lng: locale,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });

    saveLocale(locale);
    console.log(`i18n initialized with locale: ${locale}`);
  } catch (error) {
    console.error('i18n initialization failed:', error);
  }
};

export default i18n;
