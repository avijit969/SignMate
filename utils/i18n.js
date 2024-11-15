import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../languages/en.json';
import od from '../languages/od.json';
import gu from '../languages/gu.json';
import hi from '../languages/hi.json';
import 'intl-pluralrules';

// Function to get the default language
const getDefaultLanguage = async () => {
    try {
        const savedLanguage = await AsyncStorage.getItem('language');
        return savedLanguage || 'en';
    } catch (error) {
        console.error('Error loading language from storage:', error);
        return 'en'; // Fallback to default language
    }
};

const initI18n = async () => {
    const defaultLanguage = await getDefaultLanguage();

    i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: { translation: en },
                od: { translation: od },
                gu: { translation: gu },
                hi: { translation: hi }
            },
            lng: defaultLanguage,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
        });
};

initI18n();

export default i18n;
