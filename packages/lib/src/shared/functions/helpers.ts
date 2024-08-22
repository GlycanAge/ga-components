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

export function scale(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const result = (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

  if (result < outMin) {
    return outMin;
  } else if (result > outMax) {
    return outMax;
  }
  return result;
}

export function calculateSliderPosition(min: number, mid: number, max: number, result: number) {
  if (result === mid) {
    return 50;
  } else if (result === min) {
    return 9.5;
  } else if (result === max) {
    return 90.5;
  } else if (result < min) {
    return 5;
  } else if (result > max) {
    return 95;
  } else if (result > min && result < mid) {
    return scale(result, min, mid, 10, 50);
  } else if (result > mid && result < max) {
    return scale(result, mid, max, 50, 90);
  } else {
    return 0;
  }
}

export function getColorRedToBlue(min: number, mid: number, max: number, result: number) {
  const position = calculateSliderPosition(min, mid, max, result);

  if (position < 23) {
    return '#DF2120';
  } else if (position >= 23 && position <= 36) {
    return '#F2800D';
  } else if (position > 36 && position < 64) {
    return '#66CCAA';
  } else if (position >= 64 && position <= 77) {
    return '#13A195';
  } else if (position > 77) {
    return '#015566';
  }
}