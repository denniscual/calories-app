export function generateGreetings() {
  const currentHour = new Date().getHours();
  console.log({ currentHour });
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
