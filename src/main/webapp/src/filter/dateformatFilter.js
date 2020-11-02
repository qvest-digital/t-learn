import { format, toDate } from 'date-fns-tz';

export function dateFormatFilter(value, dateFormat) {
    if (!value) {
        return '';
    }

    if (dateFormat) {
        return format(toDate(value), dateFormat);
    } else {
        return format(toDate(value), 'dd.MM.yyyy HH:mm');
    }
}

export function dateOnlyFilter(value, dateFormat) {
    if (!value) {
        return '';
    }

    if (dateFormat) {
        return format(toDate(value), dateFormat);
    } else {
        return format(toDate(value), 'dd.MM.yyyy');
    }
}
