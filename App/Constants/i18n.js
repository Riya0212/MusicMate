import LocalizedStrings from 'react-native-localization';
import en from './locales/en.json';
import ar from './locales/ar.json';
const resources = { en, ar };
let strings = new LocalizedStrings(resources);

export { strings };
