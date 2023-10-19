export function getPadding(res: number, mid: number, perc: number) {
    if (perc === 50) {
        return `0 0 0 0`;
    } else {
        if (res > mid) {
            return perc > 90
                ? `0 ${perc - 37 + (1.55 * (perc-51))}px 0 0`
                : `0 ${perc - 37 + (1.6 * (perc-51))}px 0 0`;
        } else {
            return perc < 10
                ? `0 0 0 ${100 - perc - 37 + (1.6 * (100 - perc-51))}px`
                : `0 0 0 ${100 - perc - 37 + (1.7 * (100 - perc-51))}px`;
        }
    }
}

export function getMargin(res: number, mid: number, perc: number) {
    if (perc === 50) {
        return `0 0 0 0`;
    } else {
        if (res > mid) {
            return perc > 90
                ? `0 0 0 ${perc - 37 + 4 + (1.55 * (perc-51))}px`
                : `0 0 0 ${perc - 37 + 4 + (1.6 * (perc-51))}px`;
        } else {
            return perc < 10
                ? `0 ${(100 - perc - 37) + 4 + (1.6 * (100 - perc -51))}px 0 0`
                : `0 ${(100 - perc - 37) + 4 + (1.7 * (100 - perc -51))}px 0 0`;
        }
    }
}

export function getBorderRadius(res: number, mid: number, perc: number) {
    if (perc === 50) {
        return `0 0 0 0`;
    } else {
        if (res > mid) {
            return '0 6px 6px 0';
        } else {
            return '6px 0 0 6px';
        }
    }
}

export function moveDiv(res: number, mid: number, perc: number) {
      if (perc === 50) {
        return `-1030%`;
    } else {
        if (res > mid) {
            if (perc > 50 && perc < 55) {return `${-270 + (perc-51) * 30}%`;}
            if (perc >= 55 && perc < 60) {return `${-170 + (perc-55) * 10}%`;}
            if (perc >= 60 && perc < 65) {return `${-120 + (perc-60) * 8}%`;}
            if (perc >= 65 && perc < 70) {return `${-90 + (perc-65 + 2) * 2}%`;}
            if (perc >= 70 && perc < 75) {return `${-70 + (perc-70) * 2}%`;}
            if (perc >= 75 && perc < 80) {return `${-60 + (perc-75) * 2}%`;}
            if (perc >= 80 && perc < 85) {return `${-52 + (perc-80-1) * 2}%`;}
            if (perc >= 85 && perc < 90) {return `${-48 + (perc-85) * 2}%`;}
            if (perc >= 90 && perc < 95) {return `${-40}%`;}
            if (perc >= 95) {return `${-38 + (perc-95-1)}%`;}
        } else
        {
            if (perc >= 0 && perc <= 5){return `${61 + ((100 - perc - 95)*1.1)}%`;}
            if (perc > 5 && perc <= 10){return `${60}%`;}
            if (perc > 10 && perc <= 15){return `${54 + ((100 - perc - 85)*1.4)}%`;}
            if (perc > 15 && perc <= 20) {return `${48 + ((100 - perc - 80)*1.7)}%`;}
            if (perc > 20 && perc <= 25) {return `${40 + ((100 - perc - 75)*2)}%`;}
            if (perc > 25 && perc <= 30) {return `${28 + ((100 - perc - 70)*3)}%`;}
            if (perc > 30 && perc <= 35) {return `${10 + ((100 - perc - 65)*4)}%`;}
            if (perc > 35 && perc <= 40) {return `${-20 + ((100 - perc - 60)*8)}%`;}
            if (perc > 40 && perc <= 45) {return `${-70 + ((100 - perc - 55)*12)}%`;}
            if (perc > 45) {return `${-170 + ((100 - perc - 51)*30)}%`;}
        }
    }
}

export function suffix(perc: number) {
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