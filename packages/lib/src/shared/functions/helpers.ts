import {english, polish} from '../consts/languages.const';


export function suffix(perc: number) {
  if (perc === 11 || perc === 12 || perc === 13) {
    return 'th';
  }
  let lastDigit = perc.toString().split('').pop();
  switch (lastDigit) {
    case '1':
      return 'st';
    case '2':
      return 'nd';
    case '3':
      return 'rd';
    default:
      return 'th';
  }
}

export function getHeaderMessage(percentile: number, lang: string = 'english') {
  const translations = {
    english,
    polish
  };

  if (percentile < 32) {
    return translations[lang]['LOWER_THAN_AVERAGE'];
  }
  if (percentile >= 32 && percentile <= 68) {
    return translations[lang]['AROUND_AVERAGE'];
  }
  if (percentile > 68) {
    return translations[lang]['HIGHER_THAN_AVERAGE'];
  }
}

export function getTranslation(language: string = 'english', key: string) {
  const translations = {
    english,
    polish
  };

  return translations[language][key];
}