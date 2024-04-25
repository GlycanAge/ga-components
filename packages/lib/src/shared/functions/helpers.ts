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

export function getHeaderMessage(percentile: number) {
  if (percentile < 32) {
    return 'Lower than average';
  }
  if (percentile >= 32 && percentile <= 68) {
    return 'Around average';
  }
  if (percentile > 68) {
    return 'Higher than average';
  }
}