export function getFormattedDate(): string {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const dayName = daysOfWeek[today.getDay()];
  const monthName = monthsOfYear[today.getMonth()];
  const day = today.getDate();

  return `${dayName}, ${monthName} ${day}`;
}
