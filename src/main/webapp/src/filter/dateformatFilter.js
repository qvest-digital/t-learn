import { format, parseISO } from "date-fns";

export function dateFormatFilter(value, dateFormat) {
  if (!value) {
    return "";
  }

  if (dateFormat) {
    return format(parseISO(value), dateFormat);
  } else {
    return format(parseISO(value), "dd.MM.yyyy HH:mm");
  }
}
