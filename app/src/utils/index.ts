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
