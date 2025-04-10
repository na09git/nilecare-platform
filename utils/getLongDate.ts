export function getLongDate(dateString: string): string {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const dayName = daysOfWeek[date.getDay()];
  const monthName = monthsOfYear[date.getMonth()];
  const dayOfMonth = date.getDate();

  return `${dayName}, ${monthName} ${dayOfMonth}`;
}
