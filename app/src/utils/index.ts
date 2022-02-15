import moment, { Moment } from "moment";
import { useRef } from "react";

export function generateGreetings() {
  const currentHour = new Date().getHours();
  if (currentHour >= 0 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 15) {
    return "Good Afternoon";
  } else if (currentHour >= 15 && currentHour < 25) {
    return "Good Evening";
  } else {
    return "Hello";
  }
}

export function usePrevious<T>(val: T): T | null {
  let prevNow = useRef<T | null>(null);
  if (prevNow.current === null) {
    prevNow.current = val;
    return null;
  }
  return prevNow.current;
}

export function roundOff2DecimalPlaces(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function getDateLabel(current: Moment) {
  const now = moment();
  const yesterday = now.clone().subtract(1, "days");
  const tomorrow = now.clone().add(1, "days");
  const formatDate = getDefaultFormatDate(DEFAULT_DATE_FORMAT);
  const currentDate = formatDate(current);

  if (formatDate(now) === currentDate) {
    return "Today";
  } else if (formatDate(yesterday) === currentDate) {
    return "Yesterday";
  } else if (formatDate(tomorrow) === currentDate) {
    return "Tomorrow";
  } else {
    return current.format("ll");
  }
}

function getDefaultFormatDate(formatDate: string) {
  return function format(current: Moment) {
    return current.format(formatDate);
  };
}

export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
