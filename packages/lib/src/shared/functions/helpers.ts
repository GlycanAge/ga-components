export function getPadding(perc: number) {
  if (perc === 50) {
    return `0 0 0 0`;
  } else {
    if (perc > 50) {
      return perc > 90
        ? `0 ${perc - 68 + 1.9 * (perc - 51)}px 0 0`
        : `0 ${perc - 37 + 1.18 * (perc - 51)}px 0 0`;
    } else {
      return perc < 10
        ? `0 0 0 ${100 - perc - 51 + 1.6 * (100 - perc - 51)}px`
        : `0 0 0 ${100 - perc - 37 + 1.2 * (100 - perc - 51)}px`;
    }
  }
}

export function getMargin(perc: number) {
  if (perc === 50) {
    return `0 0 0 0`;
  } else {
    if (perc > 50) {
      return perc > 90
        ? `0 0 0 ${perc - 68 + 4 + 1.9 * (perc - 51)}px`
        : `0 0 0 ${perc - 37 + 4 + 1.18 * (perc - 51)}px`;
    } else {
      return perc < 10
        ? `0 ${100 - perc - 51 + 4 + 1.6 * (100 - perc - 51)}px 0 0`
        : `0 ${100 - perc - 37 + 4 + 1.2 * (100 - perc - 51)}px 0 0`;
    }
  }
}

export function getBorderRadius(perc: number) {
  if (perc === 50) {
    return `0 0 0 0`;
  } else {
    if (perc > 50) {
      return '0 6px 6px 0';
    } else {
      return '6px 0 0 6px';
    }
  }
}

export function moveDiv(perc: number) {
  if (perc === 50) {
    return `-1150%`;
  } else {
    if (perc > 50) {
      if (perc > 50 && perc < 55) {
        return `${-270 + (perc - 51) * 25}%`;
      }
      if (perc >= 55 && perc < 60) {
        return `${-175 + (perc - 55) * 10}%`;
      }
      if (perc >= 60 && perc < 65) {
        return `${-130 + (perc - 60) * 6.5}%`;
      }
      if (perc >= 65 && perc < 70) {
        return `${-105 + (perc - 65 + 2) * 3}%`;
      }
      if (perc >= 70 && perc < 75) {
        return `${-82 + (perc - 70) * 2.5}%`;
      }
      if (perc >= 75 && perc < 80) {
        return `${-70 + (perc - 75) * 2}%`;
      }
      if (perc >= 80 && perc < 85) {
        return `${-58 + (perc - 80 - 1) * 1.2}%`;
      }
      if (perc >= 85 && perc < 90) {
        return `${-53 + (perc - 85)}%`;
      }
      if (perc >= 90 && perc < 95) {
        return `${-48 + (perc - 90)}%`;
      }
      if (perc >= 95) {
        return `${-42 + (perc - 95 - 1)}%`;
      }
    } else {
      if (perc >= 0 && perc <= 5) {
        return `${57 + (100 - perc - 95)}%`;
      }
      if (perc > 5 && perc <= 10) {
        return `${53 + (100 - perc - 90)}%`;
      }
      if (perc > 10 && perc <= 15) {
        return `${47 + (100 - perc - 85)}%`;
      }
      if (perc > 15 && perc <= 20) {
        return `${41 + (100 - perc - 80)}%`;
      }
      if (perc > 20 && perc <= 25) {
        return `${32 + (100 - perc - 75)}%`;
      }
      if (perc > 25 && perc <= 30) {
        return `${18 + (100 - perc - 70) * 2}%`;
      }
      if (perc > 30 && perc <= 35) {
        return `${1 + (100 - perc - 65) * 3}%`;
      }
      if (perc > 35 && perc <= 40) {
        return `${-30 + (100 - perc - 60) * 6}%`;
      }
      if (perc > 40 && perc <= 45) {
        return `${-85 + (100 - perc - 55) * 12}%`;
      }
      if (perc > 45) {
        return `${-230 + (100 - perc - 49) * 25}%`;
      }
    }
  }
}

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