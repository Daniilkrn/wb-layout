export function getNoun (value, one, two, five) {
    let n = Math.abs(value);

    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}


export function getNounAbsent (value, one, more) {
    let n = Math.abs(value).toString();

    if (n.endsWith('1')) {
        return one;
    }

    return more;
}