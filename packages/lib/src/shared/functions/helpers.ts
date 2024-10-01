import {english, polish, slovenian, japanese} from '../consts/languages.const';

export function suffix(perc: number, lang: string = 'english') {
  if (lang !== 'english' ) {
    return '';
  }

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
    polish,
    slovenian,
    japanese
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
    polish,
    slovenian,
    japanese
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

export function getColorBlueToRed(min: number, mid: number, max: number, result: number) {
  const position = calculateSliderPosition(min, mid, max, result);

  if (position < 23) {
    return '#015566';
  } else if (position >= 23 && position <= 36) {
    return '#13A195';
  } else if (position > 36 && position < 64) {
    return '#66CCAA';
  } else if (position >= 64 && position <= 77) {
    return '#F2800D';
  } else if (position > 77) {
    return '#DF2120';
  }
}

export function getColorMedian(min: number, mid: number, max: number, result: number) {
  const position = calculateSliderPosition(min, mid, max, result);

  if (position < 9.5) {
    return '#DF2120';
  } else if (position >= 9.5 && position <= 23) {
    return '#F2800D';
  } else if (position > 23 && position < 37) {
    return '#13A195';
  } else if (position >= 37 && position <= 63) {
    return '#66CCAA';
  } else if (position > 63 && position < 77) {
    return '#13A195';
  } else if (position >= 77 && position <= 90.5) {
    return '#F2800D';
  } else if (position > 90.5) {
    return '#DF2120';
  }
}

export function calculateSliderPositionWithPercentile(perc: number) {
  if (perc === 50) {
    return 50;
  } else if (perc < 2) {
    return 2.8;
  } else if (perc > 98) {
    return 97.2;
  } else if (perc >= 2 && perc < 50) {
    return scale(perc, 3, 50, 7, 50);
  } else if (perc > 50 && perc <= 98) {
    return scale(perc, 50, 97, 50, 93);
  }
}

export function getColorRedToBlueWithPercentile(percentile: number) {
  if (percentile < 18) {
    return '#DF2120';
  } else if (percentile >= 18 && percentile < 34) {
    return '#F2800D';
  } else if (percentile >= 34 && percentile < 67) {
    return '#66CCAA';
  } else if (percentile >= 67 && percentile <= 82) {
    return '#13A195';
  } else if (percentile > 82) {
    return '#015566';
  }
}

export function getColorBlueToRedWithPercentile(percentile: number) {
  if (percentile < 18) {
    return '#015566';
  } else if (percentile >= 18 && percentile < 34) {
    return '#13A195';
  } else if (percentile >= 34 && percentile < 67) {
    return '#66CCAA';
  } else if (percentile >= 67 && percentile <= 82) {
    return '#F2800D';
  } else if (percentile > 82) {
    return '#DF2120';
  }
}

export function getColorMedianWithPercentile(percentile: number) {
  if (percentile < 2) {
    return '#DF2120';
  } else if (percentile >= 2 && percentile < 18) {
    return '#F2800D';
  } else if (percentile >= 18 && percentile < 34) {
    return '#13A195';
  } else if (percentile >= 34 && percentile < 67) {
    return '#66CCAA';
  } else if (percentile >= 67 && percentile <= 82) {
    return '#13A195';
  } else if (percentile > 82 && percentile <= 98) {
    return '#F2800D';
  } else if (percentile > 98) {
    return '#DF2120';
  }
}